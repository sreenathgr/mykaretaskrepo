import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Regex from '../utils/regex';
import {ScreenNames} from '../utils/essentials';
import CustomTextInputWithLabel from '../components/CustomTextComponentWithLabel/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomSubmitButton, SwitchButton} from '../components/Buttons/index';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [commonSubmitError, setCommonSubmitError] = useState(false);
  const [commonSubmitErrorText, SetCommonSubmitErrorText] = useState('');
  const emailValidation = email => {
    let is_validated = true;
    if (Regex.email.test(email.trim())) {
      is_validated = true;

      setEmailError(false);
      setEmailErrorText('');
    } else {
      is_validated = false;
      setEmailError(true);
      setEmailErrorText('Please enter a valid email address');
    }
    return is_validated;
  };
  const passwordValidation = password => {
    let is_validated = true;
    if (password.trim().length < 8) {
      is_validated = false;
      setPasswordError(true);
      setPasswordErrorText('password should be at least 8 characters');
    } else {
      is_validated = true;
      setPasswordError(false);
      setPasswordErrorText('');
    }
    return is_validated;
  };
  const retrieveList = async key => {
    const stringifiedList = await AsyncStorage.getItem(key);
    if (stringifiedList !== null) {
      const list = JSON.parse(stringifiedList);

      return list;
    } else {
      return [];
    }
  };
  const clearFields = () => {
    setEmail('');
    setPassword('');

    setEmailError(false);
    setPasswordError(false);

    setEmailErrorText('');
    setPasswordErrorText('');

    setCommonSubmitError(false);
    SetCommonSubmitErrorText('');
  };
  const checkUserExists = async () => {
    const userList = await retrieveList('userData');
    let checkList = userList.filter(item => item.Email === email);
    if (checkList?.length > 0) {
      let expectedEmail = checkList[0]?.Email;

      let expectedPassword = checkList[0]?.Password;

      let currentUserName = checkList[0]?.Name;
      if (expectedEmail === email && expectedPassword === password) {
        await AsyncStorage.setItem('isloggedin', 'yes');
        await AsyncStorage.setItem('currentName', currentUserName);
        clearFields();
        navigation.replace(ScreenNames.HomeScreen, {Name: currentUserName});
      } else {
        setCommonSubmitError(true);
        SetCommonSubmitErrorText('User does not exist');
      }
    } else {
      setCommonSubmitError(true);
      SetCommonSubmitErrorText('User does not exist');
    }
  };
  const commonSubmitValidation = () => {
    let is_validated = true;
    if (email.trim() === '') {
      is_validated = false;
      setEmailError(true);
      setEmailErrorText('email should not be empty');
    } else {
      is_validated = true;
      setEmailError(false);
      setEmailErrorText('');
      if (Regex.email.test(email.trim())) {
        is_validated = true;

        setEmailError(false);
        setEmailErrorText('');
        if (password.trim() === '') {
          is_validated = false;
          setPasswordError(true);
          setPasswordErrorText('password should not be empty');
        } else {
          is_validated = true;
          setPasswordError(false);
          setPasswordErrorText('');
          if (password.trim().length < 8) {
            is_validated = false;
            setPasswordError(true);
            setPasswordErrorText('password should be at least 8 characters');
          } else {
            is_validated = true;
            setPasswordError(false);
            setPasswordErrorText('');
          }
        }
      } else {
        is_validated = false;
        setEmailError(true);
        setEmailErrorText('Please enter a valid email address');
      }
    }

    return is_validated;
  };
  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground
        source={require('../assets/images/wavy2.jpg')}
        style={{flex: 1}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{paddingBottom: 20}}
          keyboardShouldPersistTaps="handled">
          <View style={Styles.contentContainer} />
          <View style={{paddingTop: 20}} />
          <CustomTextInputWithLabel
            label={'Email'}
            inputValue={email}
            onChangeTextFunc={text => {
              setEmail(text);
              emailValidation(text);
            }}
            errorDecriptionText={emailErrorText}
            isError={emailError}
          />
          <CustomTextInputWithLabel
            label={'Password'}
            inputValue={password}
            isSecure
            isError={passwordError}
            onChangeTextFunc={text => {
              setPassword(text);
              passwordValidation(text);
            }}
            errorDecriptionText={passwordErrorText}
          />
          <CustomSubmitButton
            label={'Login'}
            onPressFn={() => {
              if (commonSubmitValidation()) {
                checkUserExists();
              } else {
                setCommonSubmitError(true);
                SetCommonSubmitErrorText('Login Failed!');
              }
            }}
          />
          {commonSubmitError && (
            <View style={{alignItems: 'center', paddingTop: 10}}>
              <Text style={{color: 'red'}}>{commonSubmitErrorText}</Text>
            </View>
          )}
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              marginTop: 250,
              marginHorizontal: 30,
              alignItems: 'center',
              borderRadius: 10,
              elevation: 10,
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 13}}>Existing User?</Text>
            </View>
            <View style={{paddingTop: 5}}>
              <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}>
                Login to Your Account and Stay uptodate!!!
              </Text>
            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 25,
  },
  headerView: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerText: {
    color: 'black',
    fontSize: 30,
  },
  absoluteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '10%',
    left: '25%',
    width: '50%',
    height: '6%',
    backgroundColor: '#F44708',
    shadowColor: '#0A122A',
    shadowRadius: 10,
    borderRadius: 40,
    borderColor: 'green',
    borderWidth: 2,
    elevation: 20,
  },
});
