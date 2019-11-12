import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import * as userActions from '../../store/actions/user';
import Loading from '../components/UI/Loading';

const StartupScreen = props => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const autoAuth = async () => {
      try {
        const userName = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        const credentials = {userName, password};
        await dispatch(userActions.login(credentials));
        setLoading(false);
        props.navigation.navigate('Home');
      } catch (error) {
        setLoading(false);
        props.navigation.navigate('Auth');
      }
    };
    autoAuth();
  }, [dispatch, setLoading]);

  return <Loading loading={loading} />;
};

export default StartupScreen;
