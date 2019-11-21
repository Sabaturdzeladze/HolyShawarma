import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Clipboard,
  View,
} from 'react-native';
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {props.text}
            {props.account}
          </Text>
        </View>
      )}
      <Icon name="content-copy" size={20} color={Colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '95%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    maxWidth: '85%',
  },
  text: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 13
  },
});

export default CopyableText;
