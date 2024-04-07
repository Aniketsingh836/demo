import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [nextRoundText, setNextRoundText] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [periodId, setPeriodId] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [disableTime, setDisableTime] = useState<number>(0);
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);
  const telegramChannelLink = 'https://t.me/colorvip91';
  const contactUsLink = 'https://t.me/talktousgod';

  const handleJoinTelegram = () => {
    Linking.openURL(telegramChannelLink);
  };

  const handleContactUs = () => {
    Linking.openURL(contactUsLink);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (disableTime > 0) {
        setDisableTime(prevDisableTime => prevDisableTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [disableTime]);

  const handleModeSelection = (mode: number) => {
    setSelectedMode(mode);
    setInputDisabled(false); // Enable input after selecting mode
    checkButtonStatus(mode, periodId); // Check the status of the Next Round button
  };

  const handlePeriodIdChange = (text: string) => {
    setPeriodId(text);
    checkButtonStatus(selectedMode, text); // Check the status of the Next Round button
  };

  const checkButtonStatus = (mode: number | null, periodId: string) => {
    if (mode !== null && periodId) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleNextRound = () => {
    generateNextRoundText();
    if (selectedMode === 1) {
      setDisableTime(30);
    } else if (selectedMode === 2) {
      setDisableTime(60);
    }
    setButtonDisabled(true);
    setInputDisabled(true);
  };

  const generateNextRoundText = () => {
    const randomText = Math.random() < 0.5 ? 'BIG' : 'SMALL';
    setNextRoundText(randomText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: 20}}>
        {/* JOIN US ON TELEGRAM button */}
        <TouchableOpacity
          onPress={handleJoinTelegram}
          style={[
            styles.button,
            {marginTop: '15%', borderWidth: 1, borderColor: '#32a7d9'},
          ]}>
          <Image
            style={styles.telegramLogo}
            source={require('../../assets/images/telegramLogo.png')}
          />
          <Text style={[styles.text, {color: '#32a7d9'}]}>
            JOIN US ON TELEGRAM
          </Text>
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        {/* Mode selection */}
        <Text style={[styles.text, {marginVertical: 15}]}>Choose Mode</Text>
        <View style={styles.modeContainer}>
          <LinearGradient
            colors={['#f0b2b2', 'white']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.6, 1]}
            style={[
              styles.modeCard,
              selectedMode === 1 && {
                borderColor: '#db3536',
                borderWidth: 1,
                borderRadius: 15,
              },
              disableTime > 0 && {opacity: 0.5},
            ]}>
            <TouchableOpacity
              onPress={() => handleModeSelection(1)}
              disabled={disableTime > 0}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'center',
                  marginVertical: 5,
                }}
                source={require('../../assets/images/timer.png')}
              />
              <Text
                style={[
                  styles.text,
                  {color: selectedMode === 1 ? 'white' : 'white'},
                ]}>
                WIN GO
              </Text>
              <Text
                style={[
                  styles.text,
                  {color: selectedMode === 1 ? 'white' : 'white'},
                ]}>
                1 min
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#f0b2b2', 'white']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}} // Change the end point to make it diagonal
            locations={[0.6, 1]}
            style={[
              styles.modeCard,
              selectedMode === 2 && {
                borderColor: '#db3536',
                borderWidth: 1,
                borderRadius: 15,
              },
              disableTime > 0 && {opacity: 0.5},
            ]}>
            <TouchableOpacity
              style={[]}
              onPress={() => handleModeSelection(2)}
              disabled={disableTime > 0}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'center',
                  marginVertical: 5,
                }}
                source={require('../../assets/images/timer.png')}
              />
              <Text
                style={[
                  styles.text,
                  {color: selectedMode === 2 ? 'white' : 'white'},
                ]}>
                WIN GO
              </Text>
              <Text
                style={[
                  styles.text,
                  {color: selectedMode === 2 ? 'white' : 'white'},
                ]}>
                3 min
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Period ID input */}
        {selectedMode !== null && (
          <View>
            <Text
              style={[
                styles.text,
                {color: 'black', textAlign: 'left', marginTop: 25},
              ]}>
              Please enter last 4 digits of your period ID
            </Text>
            <LinearGradient
              colors={['#f0b2b2', 'white']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}} // Change the end point to make it diagonal
              locations={[0.6, 1]}
              style={[
                styles.inputContainer,
                {
                  backgroundColor:
                    buttonDisabled || disableTime > 0 ? '' : 'white',
                },
              ]}>
              <TextInput
                placeholder="ENTER PERIOD ID"
                placeholderTextColor={'white'}
                style={[]}
                value={periodId}
                onChangeText={handlePeriodIdChange}
                editable={!inputDisabled && disableTime === 0}
                keyboardType="numeric" // Display numeric keyboard
                maxLength={4} // Limit input to 4 characters
              />
            </LinearGradient>
          </View>
        )}

        {/* NEXT ROUND button */}
        <TouchableOpacity
          onPress={handleNextRound}
          disabled={buttonDisabled}
          style={[styles.button, {width: '100%', backgroundColor: '#db3536'}]}>
          <Text style={[styles.text, {color: 'white'}]}> NEXT ROUND</Text>
        </TouchableOpacity>

        {/* Timer */}
        {disableTime > 0 && (
          <Text style={[styles.text, {marginTop: 10}]}>
            Next round will be enabled in {disableTime} seconds
          </Text>
        )}

        {/* Result */}

        {nextRoundText && (
          <View style={styles.keyContainer}>
            <Text style={[styles.text, {color: '#0c171e', fontSize: 30}]}>
              {nextRoundText}
            </Text>
          </View>
        )}

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
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
    paddingHorizontal: 30,
  },
  inputContainer: {
    borderRadius: 15,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#db3536',
  },
  text: {
    color: '#db3536',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 25,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  keyContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#db3536',
  },

  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modeCard: {
    width: '45%',
    borderRadius: 12,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telegramLogo: {
    height: 25,
    width: 25,
    marginRight: 15,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
});
