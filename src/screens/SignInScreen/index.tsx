// SignInScreen.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const SignInScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginEnabled, setLoginEnabled] = useState(false);

  useEffect(() => {
    updateLoginButtonState(username, password);
  }, [username, password]);

  const handleLogin = async () => {
    console.log('i am heres');
    try {
      console.log('i am heres22');
      const response = await axios.post(
        'https://server-j98j.onrender.com/api/login',
        {
          username: username,
          key: password,
        },
      );
      console.log('trfdcs', response);

      // Check the response and navigate accordingly
      if (response.data.message === 'User is valid and generated by us.') {
        navigation.navigate('Dashboard');
      } else {
        // Handle invalid login
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      setErrorMessage('Failed to log in. Please try again later.');
    }
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const updateLoginButtonState = (username: string, password: string) => {
    if (username.trim() !== '' && password.trim() !== '') {
      setLoginEnabled(true);
    } else {
      setLoginEnabled(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text
        style={[
          styles.text,
          {
            fontSize: 35,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 50,
          },
        ]}>
        Login
      </Text>
      <Text style={styles.text}>NAME</Text>
      <TextInput
        onChangeText={handleUsernameChange}
        value={username}
        style={styles.inputContainer}
      />
      <Text style={styles.text}>PASSWORD</Text>
      <TextInput
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true}
        style={styles.inputContainer}
      />
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: loginEnabled ? '#db3536' : '#f0b2b2'},
        ]}
        onPress={handleLogin}
        disabled={!loginEnabled}>
        <Text
          style={[
            styles.text,
            {color: 'white', fontWeight: 'bold', fontSize: 18},
          ]}>
          Log in
        </Text>
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={[styles.text, {color: 'red', marginTop: 10}]}>
          {errorMessage}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  inputContainer: {
    backgroundColor: '#f0b2b2',
    borderRadius: 15,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  text: {color: '#aeaeae', fontSize: 12, fontWeight: '500'},
  button: {
    backgroundColor: '#db3536',
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 25,
    alignSelf: 'center',
  },
  logo: {
    height: 180,
    width: 180,
    alignSelf: 'center',
    marginTop: '20%',
  },
});
