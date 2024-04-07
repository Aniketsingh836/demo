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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginEnabled, setLoginEnabled] = useState(false);

  useEffect(() => {
    updateLoginButtonState(username, password);
  }, [username, password]);

  useEffect(() => {
    // Check if session is expired or still valid when the component mounts
    checkSessionValidity();
  }, []);

  const contactUsLink = 'https://t.me/talktousgod';

  const handleContactUs = () => {
    Linking.openURL(contactUsLink);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://server-j98j.onrender.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            key: password,
          }),
        },
      );

      const data = await response.json();
      console.log('I AM RES', data);
      if (response.ok) {
        await AsyncStorage.setItem('token', data.sessionToken);
        await AsyncStorage.setItem('expiration', data.sessionExpires);
        navigation.navigate('Dashboard');
      } else {
        setErrorMessage(data.message);
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

  const checkSessionValidity = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(
          'https://server-j98j.onrender.com/api/validate-session',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (!response.ok || !data.valid) {
          // Clear invalid session data
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('expiration');
        } else {
          // Session is valid, navigate to Dashboard
          navigation.navigate('Dashboard');
        }
      }
    } catch (error) {
      console.error('Error checking session validity:', error);
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
