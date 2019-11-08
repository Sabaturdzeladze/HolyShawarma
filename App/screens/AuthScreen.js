import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import CustomButton from '../components/UI/CustomButton';



const AuthScreen = props => {
  const [authMethod, setAuthMethod] = useState('login');
  let pageTitle = 'Login Page';
  let switchButtonTitle = 'Switch to Signup';
  let submitButtonTitle = 'Login';

  if (authMethod === 'signup') {
    pageTitle = 'Signup Page';``
    switchButtonTitle = 'Switch to Login';
    submitButtonTitle = 'Signup';
  }

  return (
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <Text style={styles.header}>{pageTitle}</Text>
        <Input style={styles.input} label="userName" />
        <Input label="password" />
        <View style={styles.buttonContainer}>
          <CustomButton title={submitButtonTitle} />
          <CustomButton
            onPress={() => {
              authMethod === 'login'
                ? setAuthMethod('signup')
                : setAuthMethod('login');
            }}
            color="#90ee90"
            title={switchButtonTitle}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    paddingBottom: 20,
  },
  header: {
    marginBottom: 25,
    fontSize: 20,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default AuthScreen;
