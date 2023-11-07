import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {ScreenNames} from '../utils/essentials';
import {SwitchButton} from '../components/Buttons';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground
        source={require('../assets/images/wavybg.jpg')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 50,
            paddingVertical: 20,
            alignItems: 'center',
            borderRadius: 10,
            elevation: 10,
          }}>
          <View>
            <Text style={{color: 'black', fontSize: 13}}>Already a User?</Text>
          </View>
          <View style={{paddingTop: 5}}>
            <Text style={{color: 'black', fontSize: 15}}>
              Login with your credentials
            </Text>
          </View>
          <View />
          <SwitchButton
            label="Login"
            bgColor="#406E8E"
            buttonTextColor="white"
            onPressFunc={() => {
              navigation?.navigate(ScreenNames.Login);
            }}
          />
          <View
            style={{
              marginTop: 10,
              borderWidth: 2,
              width: 205,
              borderRadius: 20,
              borderColor: '#E59F71',
            }}
          />
          <View style={{paddingTop: 10}}>
            <Text style={{color: 'black', fontSize: 13}}>New User?</Text>
          </View>
          <View style={{paddingTop: 5}}>
            <Text style={{color: 'black', fontSize: 15}}>
              Register now to get started!!!
            </Text>
          </View>
          <View />
          <SwitchButton
            label="Register"
            onPressFunc={() => {
              navigation?.navigate(ScreenNames.Register);
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
export default OnboardingScreen;
