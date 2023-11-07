import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Regex from '../utils/regex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInputWithLabel from '../components/CustomTextComponentWithLabel';
import {CustomSubmitButton} from '../components/Buttons';
import {ScreenNames} from '../utils/essentials';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [designationError, setDesignationError] = useState(false);

  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [nameErrorText, setNameErrorText] = useState('');
  const [designationErrorText, setDesignationErrorText] = useState('');

  const [commonSubmitError, setCommonSubmitError] = useState(false);
  const [commonSubmitErrorText, SetCommonSubmitErrorText] = useState('');

  const retrieveList = async key => {
    const stringifiedList = await AsyncStorage.getItem(key);
    if (stringifiedList !== null) {
      const list = JSON.parse(stringifiedList);

      return list;
    } else {
      return [];
    }
  };

  const storeList = async (key, list) => {
    const stringifiedList = JSON.stringify(list);
    await AsyncStorage.setItem(key, stringifiedList);
  };

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
  const nameValidation = name => {
    let is_validated = true;
    if (Regex.alphabets.test(name.trim())) {
      is_validated = true;
      setNameError(false);
      setNameErrorText('');
    } else {
      is_validated = false;
      setNameError(true);
      setNameErrorText('Name Must only contain alphabets');
    }
    return is_validated;
  };
  const desginationValidation = designationText => {
    let is_validated = true;
    if (Regex.alphaNumeric.test(designationText.trim())) {
      is_validated = true;
      setDesignationError(false);
      setDesignationErrorText('');
    } else {
      is_validated = false;
      setDesignationError(true);
      setDesignationErrorText(
        'Designation should only contain alpha numeric values',
      );
    }
    return is_validated;
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
            if (name.trim() === '') {
              is_validated = false;
              setNameError(true);
              setNameErrorText('Name should not be empty');
            } else {
              is_validated = true;
              setNameError(false);
              setNameErrorText('');
              if (Regex.alphabets.test(name.trim())) {
                is_validated = true;
                setNameError(false);
                setNameErrorText('');
                if (designation.trim() === '') {
                  is_validated = false;
                  setDesignationError(true);
                  setDesignationErrorText('Designation should not be empty');
                } else {
                  is_validated = true;
                  setDesignationError(false);
                  setDesignationErrorText('');
                  if (Regex.alphaNumeric.test(designation.trim())) {
                    is_validated = true;
                    setDesignationError(false);
                    setDesignationErrorText('');
                  } else {
                    is_validated = false;
                    setDesignationError(true);
                    setDesignationErrorText(
                      'Designation should only contain alpha numeric values',
                    );
                  }
                }
              } else {
                is_validated = false;
                setNameError(true);
                setNameErrorText('Name Must only contain alphabets');
              }
            }
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
  const clearFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setDesignation('');

    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    setDesignationError(false);

    setEmailErrorText('');
    setPasswordErrorText('');
    setNameErrorText('');
    setDesignationErrorText('');

    setCommonSubmitError(false);
    SetCommonSubmitErrorText('');
  };
  const addToUserData = async () => {
    setCommonSubmitError(false);
    SetCommonSubmitErrorText('');
    let list = await retrieveList('userData');
    let obj = {
      Email: email,
      Password: password,
      Name: name,
      Designation: designation,
    };
    let CheckList = list.filter(item => item.Email === email);

    if (CheckList.length === 0) {
      list.push(obj);

      await storeList('userData', list);
      await AsyncStorage.setItem('isloggedin', 'yes');
      await AsyncStorage.setItem('currentName', name);
      clearFields();
      navigation.replace(ScreenNames.HomeScreen, {Name: name});
    } else {
      setCommonSubmitError(true);
      SetCommonSubmitErrorText('No duplicate userid allowed');
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground
        source={require('../assets/images/wavy2.jpg')}
        style={{flex: 1}}>
        <KeyboardAwareScrollView
          contentContainerStyle={{paddingBottom: 50}}
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
            onChangeTextFunc={text => {
              setPassword(text);
              passwordValidation(text);
            }}
            isSecure
            isError={passwordError}
            errorDecriptionText={passwordErrorText}
          />
          <CustomTextInputWithLabel
            label={'Name'}
            inputValue={name}
            onChangeTextFunc={text => {
              setName(text);
              nameValidation(text);
            }}
            errorDecriptionText={nameErrorText}
            isError={nameError}
          />
          <CustomTextInputWithLabel
            inputValue={designation}
            label={'Designation'}
            onChangeTextFunc={text => {
              setDesignation(text);
              desginationValidation(text);
            }}
            errorDecriptionText={designationErrorText}
            isError={designationError}
          />
          <CustomSubmitButton
            label={'Register'}
            onPressFn={() => {
              if (commonSubmitValidation()) {
                addToUserData();
              } else {
                setCommonSubmitError(true);
                SetCommonSubmitErrorText('Registration Failed!!');
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
              marginTop: 100,
              marginHorizontal: 30,
              alignItems: 'center',
              borderRadius: 10,
              elevation: 10,
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 13}}>New User?</Text>
            </View>
            <View style={{paddingTop: 5}}>
              <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}>
                Fill the details to get Started with a account!!!
              </Text>
            </View>
            <View />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

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

export default RegisterScreen;
