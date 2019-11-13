import React, {useState} from 'react';
import {View, Text, StyleSheet, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CopyableText = props => {
  const [isCopied, setIsCopied] = useState(false);

  const writeToClipboard = async () => {
    try {
      await Clipboard.setString(props.account || props.text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      setIsCopied(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.text}
        {props.account}
      </Text>
      <Icon
      style={{marginTop: 20}}
        name="content-copy"
        size={20}
        color={isCopied ? 'seagreen' : '#FF5908'}
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
    marginTop: 20,
    flex: 1,
    textAlign:'center',
    fontWeight: 'bold',
  },
});

export default CopyableText;
