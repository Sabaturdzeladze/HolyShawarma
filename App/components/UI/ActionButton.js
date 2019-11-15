import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import Loading from './Loading';

const ActionButton = ({style, loading, title, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      disabled={loading}
      style={{...styles.screen, ...style}}>
      {!loading ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <Loading color="#fff" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#2398EF',
    borderRadius: 20,
    alignSelf: 'center'
  },
  title: {
    color: '#fff',
    fontWeight:'bold'
  },
});

export default ActionButton;
