import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const FlashComponent = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  message: {
    color: '#fff',
    fontSize: 12
  }
});

export default FlashComponent;
