import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../Types/Colors';
import {GradientBackground} from '../Types/Compose';
import {addBorrowing, getData} from './FeatchAPI';
import Snackbar from 'react-native-snackbar';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookId, setBookId] = useState('');
  const uri = 'http://10.0.3.2:3000/books';
  const onRefresh = async () => {
    setRefreshing(true);
    getData(uri)
      .then(data => setBooks(data))
      .catch(error => console.log(error));
    setRefreshing(false);
  };

  useEffect(() => {
    getData(uri)
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);
  const clearQuery = () => {
    setQuery('');
  };
  const createBorrowing = async () => {
    const item = {
      bookId: bookId,
      borrowerName: name,
      phoneNumber: phoneNumber,
    };
    // console.log(data);
    const data = await addBorrowing(item);
    setModalVisible(false);

    Alert.alert('Thông báo', data.msg);
    // console.log(data.msg);
  };
  const renderBook = ({item}) => {
    return (
      <GradientBackground style={st.book_item}>
        <TouchableOpacity>
          <Image
            source={{uri: item.image}}
            style={st.book_img}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={st.book_info}>
          <Text style={st.book_title}>{item.name}</Text>
          <Text style={st.book_author}>Tác giả : {item.author}</Text>
          <Text style={st.book_author}>Số lượng : {item.copies} bản</Text>
          <TouchableOpacity
            style={st.btnPlus}
            onPress={() => {
              setModalVisible(true);
              setBookId(item._id);
              setName('');
              setPhoneNumber('');
            }}>
            <Image source={require('../images/ic_plus.png')} style={st.icon} />
          </TouchableOpacity>
        </View>
      </GradientBackground>
    );
  };

  return (
    <View style={st.container}>
      <Modal visible={modalVisible} transparent={true}>
        <View style={st.modal_view}>
          <View style={st.containerModal}>
            <Text style={st.modal_title}>Tạo Phiếu Mượn</Text>
            <TextInput
              style={st.modal_input}
              placeholder="Tên người mượn"
              value={name}
              onChangeText={it => setName(it)}
            />
            <TextInput
              style={st.modal_input}
              placeholder="Số điện thoại người mượn"
              value={phoneNumber}
              onChangeText={it => setPhoneNumber(it)}
            />
            <View style={st.row}>
              <TouchableOpacity
                style={st.modal_btn}
                onPress={() => {
                  createBorrowing();
                }}>
                <Text style={st.modal_btn_text}>Tạo Phiếu Mượn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[st.modal_btn, {backgroundColor: '#ddd'}]}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={[st.modal_btn_text]}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={st.header}>
        <Image source={require('../images/hungcy.jpg')} style={st.ic_avatar} />
        <View style={st.header_text}>
          <Text style={st.txt}>Xin Chao</Text>
          <Text style={st.txt}>Hoang Van Hung</Text>
        </View>
      </View>
      <View style={st.searchBar}>
        <Image
          source={require('../images/ic_search.png')}
          style={st.ic_search}
        />
        <TextInput
          style={st.searchView}
          placeholder="Loại sách bạn muốn tìm"
          placeholderTextColor={colors.textHint}
          value={query}
          onChangeText={it => setQuery(it)}
          textContentType="text"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearQuery} style={st.ic_delete}>
            <Image
              source={require('../images/ic_xdelete.png')}
              style={{width: 15, height: 15, tintColor: '#52555A'}}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={st.book_list}>
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default Home;

const st = StyleSheet.create({
  row: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginBottom: 10,
  },
  modal_input: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  modal_btn: {
    width: '40%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_view: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal_btn_text: {
    color: 'black',
    fontSize: 16,
  },
  containerModal: {
    width: '100%',
    padding: 10,
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modal_title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  //css items
  icon: {
    width: 20,
    height: 20,
  },
  btnPlus: {
    alignSelf: 'flex-end',
    margin: 5,
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBackground,
  },
  book_item: {
    marginVertical: 10,
    width: '45%',
    height: 260,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  book_img: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  book_title: {
    fontSize: 18,
    color: colors.textprimary,
  },
  book_author: {
    fontSize: 14,
    color: colors.textprimary,
  },
  book_copies: {},

  ic_search: {
    width: 20,
    height: 20,
    tintColor: colors.textHint,
    zIndex: 1,
    position: 'absolute',
    left: 10,
  },
  ic_delete: {
    width: 15,
    height: 15,
    zIndex: 1,
    alignItems: 'center',
    tintColor: colors.textHint,
    position: 'absolute',
    right: 15,
  },
  txt: {
    color: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.searchView,
    borderRadius: 10,
  },
  searchView: {
    width: '90%',
    borderRadius: 8,
    backgroundColor: colors.searchView,
    height: '100%',
    padding: 10,
    color: colors.textprimary,
    marginLeft: 15,
    fontSize: 15,
  },
  header_text: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.background,
  },
  header: {
    height: 70,
    flexDirection: 'row',
  },
  ic_avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
});
