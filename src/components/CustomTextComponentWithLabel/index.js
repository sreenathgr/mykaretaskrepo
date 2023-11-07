import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const CustomTextInputWithLabel = ({
  label = '',
  placeholder = '',
  inputValue = '',
  isError = false,
  isSecure = false,
  onChangeTextFunc = () => {},

  errorDecriptionText = '',
}) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.labelContainer}>
        <Text style={Styles.labelText}>{label}</Text>
      </View>
      <View style={Styles.textInputContainer}>
        <TextInput
          value={inputValue}
          style={Styles.textInputStyle}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          onChangeText={onChangeTextFunc}
        />
      </View>
      <View style={{paddingStart: 10}}>
        {isError && <Text style={{color: 'red'}}>{errorDecriptionText}</Text>}
      </View>
    </View>
  );
};
export default CustomTextInputWithLabel;

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  labelContainer: {},
  labelText: {
    color: '#344966',
    fontSize: 18,
    fontStyle: 'italic',
  },
  textInputContainer: {
    paddingTop: 10,
  },
  textInputStyle: {
    color: 'white',
    backgroundColor: '#0F1A20',
    borderRadius: 30,
    paddingStart: 15,
    paddingVertical: 15,
  },
});
