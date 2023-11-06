import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const CustomSubmitButton = ({label}) => {
  return (
    <View style={Styles.CustomButtonContainer}>
      <TouchableOpacity style={Styles.CustomButtonStyle} title="test">
        <Text style={{color: 'white', fontSize: 20}}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const SwitchButton = () => {
  return (
    <View style={{marginTop: 10}}>
      <TouchableWithoutFeedback
        style={{
          backgroundColor: '#FFD5C2',
          paddingHorizontal: 40,
          paddingVertical: 15,
          borderRadius: 50,
          elevation: 10,
          borderColor: 'black',
          borderWidth: 1,
        }}>
        <Text style={{fontSize: 15, color: '#0C0C0C'}}>Register</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Styles = StyleSheet.create({
  CustomButtonContainer: {marginHorizontal: 30, marginTop: 30},
  CustomButtonStyle: {
    backgroundColor: '#F4A259',
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
