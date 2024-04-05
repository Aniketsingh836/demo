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
  Linking,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginEnabled, setLoginEnabled] = useState(false);

  useEffect(() => {
    validateSession();
    updateLoginButtonState(username, password);
  }, [username, password]);
  const contactUsLink = 'https://t.me/talktousgod';

  const handleContactUs = () => {
    Linking.openURL(contactUsLink);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://server-j98j.onrender.com/api/login',
        {
          username: username,
          key: password,
        },
      );
      const responseData = response.data;
      console.log('RESPONSE', responseData);
      if (responseData.message === 'User is valid.') {
        const sessionToken = responseData.sessionToken;
        await AsyncStorage.setItem('token', sessionToken);
        navigation.navigate('Dashboard');
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
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
    setLoginEnabled(username.trim() !== '' && password.trim() !== '');
  };

  const validateSession = async () => {
    try {
      const sessionToken = await AsyncStorage.getItem('token');
      if (sessionToken) {
        const response = await axios.get(
          'https://server-j98j.onrender.com/api/validate-session',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionToken}`,
            },
          },
        );
        console.log('SESSION TOKEN RES', response);
        if (response.data.valid) {
          navigation.navigate('Dashboard');
        }
      }
    } catch (error) {
      console.error('Error validating session:', error);
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
          {backgroundColor: loginEnabled ? '#db3536' : 'lightgrey'},
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

      {/* HOW TO BUY YOUR KEY section */}

      <TouchableOpacity
        onPress={handleContactUs}
        style={[
          styles.button,
          {width: '100%', backgroundColor: '#db3536', marginBottom: 20},
        ]}>
        <Text style={[styles.text, {color: 'white', lineHeight: 25}]}>
          TO BUY KEY, CONTACT US
        </Text>
      </TouchableOpacity>
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
