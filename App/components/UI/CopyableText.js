import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage, hideMessage} from 'react-native-flash-message';

const CopyableText = props => {
  const writeToClipboard = async () => {
    try {
      await Clipboard.setString(props.account || props.text);
      showMessage({
        message: 'Copied to Clipboard.',
      });
    } catch (error) {
      showMessage({
        message: 'Failed to Copy.',
      });
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={writeToClipboard}
      activeOpacity={0.7}>
      <Text style={styles.text}>
        {props.text}
        {props.account}
      </Text>
      <Icon name="content-copy" size={20} color="#FF5908" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
  },
});

export default CopyableText;
