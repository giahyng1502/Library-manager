import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Snackbar from 'react-native-snackbar';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const hanlerLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Snackbar.show({
        text: 'Vui lòng điền đầy đủ thông tin',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    try {
      const res = await fetch('http://10.0.3.2:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_SHORT,
        });
        console.log(data);

        return;
      }
      Snackbar.show({
        text: 'Đăng nhập thành công',
        duration: Snackbar.LENGTH_SHORT,
      });
      navigation.navigate('HomeTabs');
    } catch (error) {
      Snackbar.show({
        text: 'Có lỗi khi đăng nhập vui lòng thử lại sau',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('lỗi khi đăng nhập' + error);
    }
  };
  return (
    <View style={st.fullScreen}>
      {/* <Image
        source={require('../images/logo.png')}
        style={st.logo}
        resizeMode="cover"
      /> */}
      <Text style={st.tittle}>Welcome to Lungo !!</Text>
      <Text style={[st.subTittle, st.subTittle2]}>Login to Continue</Text>
      <TextInput
        value={email}
        placeholder="Email address"
        style={st.editText}
        onChangeText={it => setEmail(it)}
        inputMode="email"
        placeholderTextColor="#AEAEAE"></TextInput>
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={it => setPassword(it)}
        style={st.editText}
        placeholderTextColor="#AEAEAE"
        secureTextEntry={true}></TextInput>

      <Pressable style={st.firstButton} onPress={hanlerLogin}>
        <Text style={st.firstButtonText}>Sign in</Text>
      </Pressable>

      <View style={st.secondButtonContent}>
        <Text style={st.subTittle}>Don't have account? Click </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={st.textButton}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={st.secondButtonContent}>
        <Text style={st.subTittle}>Forget password? Click </Text>
        <Text style={st.textButton}>Reset</Text>
      </View>
    </View>
  );
};

export default Login;

const st = StyleSheet.create({
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
  tittle: {
    fontSize: 28,
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subTittle: {
    fontSize: 16,
    color: '#AEAEAE',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subTittle2: {
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
  secondButton: {
    width: '100%',
    backgroundColor: 'white',
    height: '7%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 10,
    position: 'relative',
  },
  secondButtonContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  buttonLogo: {
    width: 20,
    height: 20,
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    marginLeft: 20,
  },
  secondButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textButton: {
    fontSize: 16,
    color: '#D17842',
    fontWeight: 'bold',
  },
});
