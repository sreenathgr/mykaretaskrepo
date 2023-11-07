import React from 'react';
import {ScreenNames} from './utils/essentials';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenNames.SplashScreen}>
          <Stack.Screen
            name={ScreenNames.Onboarding}
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenNames.SplashScreen}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenNames.Register}
            component={RegisterScreen}
            options={{title: 'Register User'}}
          />
          <Stack.Screen
            name={ScreenNames.Login}
            component={LoginScreen}
            options={{title: 'Login User'}}
          />
          <Stack.Screen
            name={ScreenNames.HomeScreen}
            component={HomeScreen}
            options={{headerLeft: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Router;
