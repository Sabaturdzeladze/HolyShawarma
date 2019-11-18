import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import * as userActions from '../../store/actions/user';

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
      <Image
        source={require('../assets/images/loading_logo.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7584E',
  },
  image: {
    width: 277,
    height: 226,
    resizeMode: 'stretch',
  },
});

export default StartupScreen;
