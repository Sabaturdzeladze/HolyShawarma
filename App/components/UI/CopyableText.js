import React from 'react';
import {View, Text, StyleSheet, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CopyableText = props => {
  const writeToClipboard = async () => {
    await Clipboard.setString(props.account);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.text}:{' '}
        {props.account}
      </Text>
      <Icon
        name="content-copy"
        size={20}
        color="#ccc"
        onPress={writeToClipboard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  text: {
    flex: 1,
  },
});

export default CopyableText;
