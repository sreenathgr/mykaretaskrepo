import React, {useState} from 'react';
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
import CustomTextInputWithLabel from '../components/CustomTextComponentWithLabel/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomSubmitButton, SwitchButton} from '../components/Buttons/index';
const LoginOrRegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
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
  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground
        source={require('../assets/images/wavy2.jpg')}
        style={{flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 20}}>
          <View style={Styles.contentContainer}>
            <View style={Styles.headerView}>
              <Text style={Styles.headerText}>Login</Text>
            </View>
          </View>

          <CustomTextInputWithLabel
            label={'Email'}
            onChangeTextFunc={text => {
              emailValidation(text);
            }}
            errorDecriptionText={emailErrorText}
            isError={emailError}
          />
          <CustomTextInputWithLabel
            label={'Password'}
            isSecure
            isError={passwordError}
            errorDecriptionText={passwordErrorText}
          />
          <CustomSubmitButton label={'Login'} />
          {/* <View style={{alignItems: 'center', paddingTop: 10}}>
            <Text style={{fontSize: 15, color: 'red'}}>
              Submit Validation Error
            </Text>
          </View> */}
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              marginTop: 200,
              marginHorizontal: 30,
              alignItems: 'center',
              borderRadius: 10,
              elevation: 10,
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 13}}>New User?</Text>
            </View>
            <View style={{paddingTop: 5}}>
              <Text style={{color: 'black', fontSize: 15}}>
                Register now to get started!!!
              </Text>
            </View>
            <View />
            <SwitchButton />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginOrRegisterScreen;

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
