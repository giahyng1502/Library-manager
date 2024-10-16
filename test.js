import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const TestApp = () => {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [image, setImage] = useState('');

  const [username2, setUsername2] = useState('');
  const [password2, setPass2] = useState('');
  const [image2, setImage2] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Lưu lại ID người dùng được chọn

  const getData = async () => {
    try {
      const res = await fetch(
        'https://6704cf1bab8a8f892734e18f.mockapi.io/Users',
      );
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async id => {
    try {
      const res = await fetch(
        `https://6704cf1bab8a8f892734e18f.mockapi.io/Users/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (res.ok) {
        getData(); // Sau khi xóa, lấy danh sách cập nhật
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByID = async id => {
    setSelectedUserId(id); // Lưu lại ID người dùng khi sửa
    try {
      const res = await fetch(
        `https://6704cf1bab8a8f892734e18f.mockapi.io/Users/${id}`,
      );
      const data = await res.json();
      setUsername2(data.Username);
      setPass2(data.password);
      setImage2(data.avatar);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    if (!selectedUserId) return;
    try {
      const res = await fetch(
        `https://6704cf1bab8a8f892734e18f.mockapi.io/Users/${selectedUserId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username2,
            password: password2,
            avatar: image2,
          }),
          // console.log(body)
        },
      );
      if (res.ok) {
        Alert.alert('Thành công', 'Cập nhật thành công');
        setModalVisible(false);
        getData(); // Cập nhật danh sách sau khi sửa
      } else {
        Alert.alert('Lỗi', 'Cập nhật thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = id => {
    Alert.alert('Xóa', 'Bạn có chắc muốn xóa?', [
      {
        text: 'Yes',
        onPress: () => deleteUser(id),
      },
      {text: 'No', onPress: () => console.log('Cancel Pressed')},
    ]);
  };

  const addUser = async () => {
    if (username && password && image) {
      try {
        const res = await fetch(
          'https://6704cf1bab8a8f892734e18f.mockapi.io/Users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              avatar: image,
            }),
          },
        );
        if (res.ok) {
          getData(); // Cập nhật danh sách sau khi thêm mới
          setUsername(''); // Reset các trường nhập
          setPass('');
          setImage('');
          Alert.alert('Thành công', 'Thêm tài khoản thành công');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Lỗi', 'Không được để trống các trường');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item.avatar}} style={{width: 100, height: 100}} />
        <Text>{item.Username}</Text>
        <Text>{item.password}</Text>
        <Text
          onPress={() => confirmDelete(item.id)}
          style={styles.deleteButton}>
          Xóa
        </Text>
        <Text style={styles.updateButton} onPress={() => getUserByID(item.id)}>
          Sửa
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Tài khoản"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          secureTextEntry
          onChangeText={setPass}
          style={styles.input}
        />
        <TextInput
          placeholder="Hình ảnh (URL)"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addUser}>
          <Text style={styles.text}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>Không có dữ liệu</Text>}
      />
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Tài khoản"
              value={username2}
              onChangeText={setUsername2}
              style={styles.input}
            />
            <TextInput
              placeholder="Mật khẩu"
              value={password2}
              secureTextEntry
              onChangeText={setPass2}
              style={styles.input}
            />
            <TextInput
              placeholder="Hình ảnh (URL)"
              value={image2}
              onChangeText={setImage2}
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={updateUser}>
              <Text style={styles.text}>Sửa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TestApp;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
  },
  addButton: {
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: 'yellow',
    marginBottom: 20,
    width: 300,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  updateButton: {
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
