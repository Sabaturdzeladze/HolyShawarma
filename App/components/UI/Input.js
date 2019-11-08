import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const Input = props => {
  return (
    <View style={{...styles.wrapper, ...props.style}}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 0,
    width: '100%',
  },
  label: {
    marginBottom: 5,
  },
});

export default Input;
