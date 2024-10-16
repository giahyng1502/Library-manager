import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Snackbar from 'react-native-snackbar';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    // setLoading(true);

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return Snackbar.show({
        text: 'Vui lòng điền đầy đủ thông tin',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
    }
    if (password.length < 8) {
      return Snackbar.show({
        text: 'Mật khẩu phải từ 8 đến 20 ký tự',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Snackbar.show({
        text: 'Email không đúng định dạng',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
      return;
    }
    if (name.trim().length < 3) {
      Snackbar.show({
        text: 'Tên tài khoản phải từ 3 đến 50 ký tự',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
      return;
    }

    if (password !== confirmPassword) {
      Snackbar.show({
        text: 'Mật khẩu nhập lại không trùng khớp',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('http://10.0.3.2:3000/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setLoading(false);

        Snackbar.show({
          text: data.msg,
          duration: Snackbar.LENGTH_SHORT,
          numberOfLines: 1,
        });
        return;
      }
      setLoading(false);
      Snackbar.show({
        text: 'Đăng ký thành công',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
      navigation.navigate('Login');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Snackbar.show({
        text: 'Lỗi do hệ thống vui lòng đăng ký lại sau',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 1,
      });
      console.log('Có lỗi khi đăng ký: ' + error);
    }
  };

  return (
    <View style={styles.fullScreen}>
      {/* <Image
        source={require('../images/logo.png')}
        style={styles.logo}
        resizeMode="cover"
      /> */}
      <Text style={styles.title}>Welcome to Lungo !!</Text>
      <Text style={[styles.subtitle, styles.subtitleMargin]}>
        Register to Continue
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.editText}
        placeholderTextColor="#AEAEAE"
      />
      <TextInput
        placeholder="Email"
        style={styles.editText}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#AEAEAE"
        keyboardType="email-address" // Sử dụng keyboardType cho email
      />
      <TextInput
        placeholder="Password"
        style={styles.editText}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#AEAEAE"
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Re-type password"
        style={styles.editText}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#AEAEAE"
        secureTextEntry={true}
      />

      <Pressable style={styles.firstButton} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text style={styles.firstButtonText}>Register</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.secondButtonContent}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.subtitle}>Bạn đã có tài khoản? Nhấn </Text>
        <Text style={styles.textButton}>Đăng nhập</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen; // Đảm bảo rằng tên đã được sửa

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền trong suốt
  },

  fullScreen: {
    backgroundColor: '#0C0F14',
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#AEAEAE',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subtitleMargin: {
    margin: 20,
  },
  editText: {
    width: '100%',
    borderColor: '#AEAEAE',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#0C0F14',
    color: '#AEAEAE',
  },
  firstButton: {
    width: '100%',
    backgroundColor: '#D17842',
    height: '7%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  firstButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondButtonContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  textButton: {
    fontSize: 16,
    color: '#D17842',
    fontWeight: 'bold',
  },
});
