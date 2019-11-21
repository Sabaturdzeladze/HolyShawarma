import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Keyboard
} from 'react-native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

import {login, signup} from '../../store/actions/user';
import AnimatedInputLabel from './UI/AnimatedInputLabel';
import LoginButton from './UI/ActionButton';
import Colors from '../Constants/Colors';
import RedLogo from '../assets/images/logo.png';

const Auth = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authMethod = props.method;

  useEffect(() => {
    if (authMethod === 'login') {
      const setLoginUsername = async () => {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          setUserName(username);
        }
      };
      setLoginUsername();
    }
  }, []);

  let submitButtonTitle = 'შესვლა';

  if (authMethod === 'signup') {
    submitButtonTitle = 'რეგისტრაცია';
  }

  const changeTextHanlder = (value, state = 'userName') => {
    state === 'userName' ? setUserName(value) : setPassword(value);
  };

  const dispatch = useDispatch();
  const authHandler = async () => {
    const credentials = {userName, password};
    const action = authMethod === 'login' ? login : signup;

    try {
      Keyboard.dismiss()
      setLoading(true);
      await dispatch(action(credentials));
      setLoading(false);
      props.navigation.navigate(authMethod === 'login' ? 'Home' : 'Login');
    } catch (error) {
      setLoading(false);
      showMessage({
        message: `${error}`,
        position: {
          bottom: 55,
          left: 40,
          right: 40,
        },
      });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={RedLogo} />
      </View>
      <View style={styles.card}>
        <AnimatedInputLabel
          label="გადამრტყმელი"
          value={userName}
          onChangeText={value => changeTextHanlder(value)}
          translateY={-20}
          translateX={15}
        />
        <AnimatedInputLabel
          label="პაროლი"
          value={password}
          onChangeText={value => changeTextHanlder(value, 'password')}
          secureTextEntry={true}
          containerStyle={{ marginTop: 10 }}
          translateY={-20}
          translateX={15}
        />
        <View style={styles.actionsContainer}>
          <LoginButton
            loading={loading}
            onPress={authHandler}
            title={submitButtonTitle}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginTop: 10 ,
    paddingTop : 10
  },
  imgContainer :{

  },
  wrapper: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  header: {
    marginBottom: 25,
    fontSize: 20,
    color: Colors.primary,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
  },
  image: {
    width: 147,
    height: 120,
    resizeMode: 'stretch'
  },
});

export default Auth;
