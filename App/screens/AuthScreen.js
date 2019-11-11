import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import CustomButton from '../components/UI/CustomButton';
import {userLogin} from '../../store/actions/user';

const AuthScreen = props => {
  const [authMethod, setAuthMethod] = useState('login');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  let pageTitle = 'Login Page';
  let switchButtonTitle = 'Switch to Signup';
  let submitButtonTitle = 'Login';

  if (authMethod === 'signup') {
    pageTitle = 'Signup Page';
    ``;
    switchButtonTitle = 'Switch to Login';
    submitButtonTitle = 'Signup';
  }

  let userIsLogedIn = useSelector(state => state.user.user.isLogedIn);
  const changeTextHanlder = (value, state = 'userName') => {
    state === 'userName' ? setUserName(value) : setPassword(value);
  };

  const dispatch = useDispatch();
  const loginHandler = async () => {
    try {
      const res = await dispatch(userLogin({userName, password}));
      
      props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Error ocured',
        `${error}`,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('ok pressed');
            },
            style: 'default',
          },
        ],
        {cancelable: false},
      );
    }
  };
  return (
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <Text style={styles.header}>{pageTitle}</Text>
        <Input
          value={userName}
          style={styles.input}
          label="UserName"
          onChangeText={value => changeTextHanlder(value)}
        />
        <Input
          value={password}
          label="Password"
          onChangeText={value => changeTextHanlder(value, 'password')}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => loginHandler()}
            title={submitButtonTitle}
          />
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
