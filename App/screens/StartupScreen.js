import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import * as userActions from '../../store/actions/user';
import Loading from '../components/UI/Loading';

const StartupScreen = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const autoAuth = async () => {
      try {
        setLoading(true);
        const userName = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        const credentials = {userName, password};
        dispatch(userActions.login(credentials));
        setLoading(false);
        props.navigation.navigate('Home');
      } catch (error) {
        setLoading(false);
        props.navigation.navigate('Login');
      }
    };
    autoAuth();
  }, [dispatch, setLoading]);

  return <Loading loading={loading} />;
};

export default StartupScreen;
