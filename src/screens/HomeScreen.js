import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {ScreenNames} from '../utils/essentials';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SwitchButton} from '../components/Buttons';

const {height} = Dimensions.get('screen');
const HomeScreen = ({navigation, route}) => {
  const {params} = route;
  const [userDetails, setUserDetails] = useState({});
  const retrieveList = async key => {
    const stringifiedList = await AsyncStorage.getItem(key);
    if (stringifiedList !== null) {
      const list = JSON.parse(stringifiedList);

      return list;
    } else {
      return [];
    }
  };
  const retrieveData = async () => {
    let list = await retrieveList('userData');
    let currentUserObj = list?.filter((item, index) => {
      return item.Name === params.Name;
    });

    setUserDetails(currentUserObj[0]);
  };
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.headerView}>
        <View style={{flex: 1.5}}>
          <Text style={{fontSize: 15, color: 'white'}}>
            Welcome Onboard {params?.Name},
          </Text>
        </View>
        <View style={{flex: 1}}>
          <SwitchButton
            label="LOG OUT"
            onPressFunc={async () => {
              await AsyncStorage.removeItem('isloggedin');
              await AsyncStorage.removeItem('currentName');
              navigation?.replace(ScreenNames?.Onboarding);
            }}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <SwitchButton
          label="FETCH USER DETAILS"
          bgColor="#E8F0FF"
          onPressFunc={() => {
            retrieveData();
          }}
        />
      </View>
      <ScrollView
        style={{height: height}}
        contentContainerStyle={{paddingBottom: 30}}>
        {Object.keys(userDetails).length !== 0 && (
          <View
            style={{
              padding: 15,
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: 'black',
              margin: 20,
            }}>
            <Text style={Styles.showtext}>Email:{userDetails?.Email}</Text>
            <Text style={Styles.showtext}>
              Password:{userDetails?.Password}
            </Text>
            <Text style={Styles.showtext}>name:{userDetails?.Name}</Text>
            <Text style={Styles.showtext}>
              Designation:{userDetails?.Designation}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F46036',
  },
  headerView: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#00171F',
    paddingVertical: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showtext: {
    color: 'white',
  },
});
