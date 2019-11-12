import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert , Image} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import CustomButton from '../components/UI/CustomButton';
import {login, signup} from '../../store/actions/user';
import ActionButton from '../components/UI/ActionButton';

const AuthScreen = props => {
  const [authMethod, setAuthMethod] = useState('login');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let pageTitle = 'Login Page';
  let switchButtonTitle = 'Switch to Signup';
  let submitButtonTitle = 'Login';

  if (authMethod === 'signup') {
    pageTitle = 'Signup Page';
    switchButtonTitle = 'Switch to Login';
    submitButtonTitle = 'Signup';
  }

  const changeTextHanlder = (value, state = 'userName') => {
    state === 'userName' ? setUserName(value) : setPassword(value);
  };

  const dispatch = useDispatch();
  const authHandler = async () => {
    const credentials = {userName, password};
    const action = authMethod === 'login' ? login : signup;

    try {
      setLoading(true);
      await dispatch(action(credentials));
      setLoading(false);
      props.navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Error occured',
        `${error}`,
        [
          {
            text: 'OK',
            onPress: () => {},
            style: 'default',
          },
        ],
        {cancelable: false},
      );
    }
  };
  return (
    <View style={styles.wrapper}>
     <View style={styles.xstqsh}>
     <Card style={styles.card}>
        <Text style={styles.header}>{pageTitle}</Text>
        <Input
          value={userName}
          style={styles.input}
          label="Username"
          onChangeText={value => changeTextHanlder(value)}
        />
        <Input
          value={password}
          label="Password"
          onChangeText={value => changeTextHanlder(value, 'password')}
          secureTextEntry={true}
        />
        <View style={styles.actionsContainer}>
          <View style={styles.buttonContainer}>
            <ActionButton
              loading={loading}
              onPress={authHandler}
              title={submitButtonTitle}
              style={styles.actionBtn}
            />
          </View>
          <ActionButton
            onPress={() => {
              authMethod === 'login'
                ? setAuthMethod('signup')
                : setAuthMethod('login');
            }}
            title={switchButtonTitle}
            style={{...styles.actionBtn, backgroundColor: '#FF5908'}}
          />
        </View>
      </Card>
      <View style={{alignItems:'center' , marginBottom: 50}}>
        <Image source={require('../../assets/img/shawarman.jpg')} style={{width: '100%',height:'70%' }}/>
      </View>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {

    backgroundColor:'#FFCD9C',
    height:'100%'
    
    
  },
  card: {
    paddingBottom: 20,
    marginTop: 250,

    
  },
  header: {
    marginBottom: 25,
    fontSize: 20,
    color: '#FF5908',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '45%',
    marginRight: 5,
  },
  xstqsh: {
    justifyContent: 'center',
    height:'100%'
  }
});

export default AuthScreen;
