import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import Loading from './Loading';

const ActionButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={styles.screen}>
      {!props.loading ? (
        <Text style={styles.title}>{props.title}</Text>
      ) : (
        <Loading />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#0000ff',
    borderRadius: 2,
    alignSelf: 'center'
  },
  title: {
    color: '#fff',
  },
});

export default ActionButton;
