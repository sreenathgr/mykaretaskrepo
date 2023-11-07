import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {ScreenNames} from '../utils/essentials';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation?.replace(ScreenNames.Onboarding);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <SafeAreaView style={Styles.container}>
      <ImageBackground
        source={require('../assets/images/splashimage.jpg')}
        style={Styles.backgroundImage}
        resizeMode="stretch">
        <Text style={Styles.splashText}>Splash Screen</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'green',
  },
});
export default SplashScreen;
