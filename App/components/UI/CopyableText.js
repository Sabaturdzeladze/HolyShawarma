import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import Colors from '../../Constants/Colors';

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
      {props.children ? (
        props.children
      ) : (
        <Text style={styles.text}>
          {props.text}
          {props.account}
        </Text>
      )}
      <Icon name="content-copy" size={20} color={Colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    opacity: 1,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default CopyableText;
