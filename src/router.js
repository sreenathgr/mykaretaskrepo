import React from 'react';
import {ScreenNames} from './utils/essentials';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginOrRegisterScreen from './screens/LoginOrRegisterScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenNames.SplashScreen}>
          <Stack.Screen
            name={ScreenNames.SplashScreen}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenNames.LoginOrRegister}
            component={LoginOrRegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Router;
