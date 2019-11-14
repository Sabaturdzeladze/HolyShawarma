import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import * as userActions from '../../store/actions/user';
import Loading from '../components/UI/Loading';
import Colors from '../Constants/Colors';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoAuth = async () => {
      try {
        const userName = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        const credentials = {userName, password};
        await dispatch(userActions.login(credentials));
        props.navigation.navigate('Home');
      } catch (error) {
        props.navigation.navigate('Auth');
      }
    };
    autoAuth();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Loading color={Colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
