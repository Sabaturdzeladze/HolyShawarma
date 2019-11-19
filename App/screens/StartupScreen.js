import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Easing, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import * as userActions from '../../store/actions/user';
import wing_left from '../assets/images/wing_left.png';
import wing_right from '../assets/images/wing_right.png';
import shawarma from '../assets/images/shawarma.png';
import ring from '../assets/images/ring.png';

const StartupScreen = props => {
  const dispatch = useDispatch();
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [zoomRing, setZoomRing] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(zoomRing, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['30deg', '-10deg', '30deg'],
  });
  const spin2 = rotateAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-30deg', '10deg', '-30deg'],
  });
  const transform = [
    {
      scaleX: zoomRing.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.25, 1],
      }),
    },
    {
      scaleY: zoomRing.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.25, 1],
      }),
    },
  ];

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
      <Animated.Image source={ring} style={{...styles.ring, transform}} />
      <View style={styles.container}>
        <Animated.Image
          source={wing_left}
          style={{
            transform: [{rotate: spin}],
            position: 'relative',
            left: 100,
            top: 30,
          }}
        />
        <Image source={shawarma} />
        <Animated.Image
          source={wing_right}
          style={{
            transform: [{rotate: spin2}],
            position: 'relative',
            right: 93,
            top: 30,
          }}
        />
      </View>
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
  container: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'stretch',
    transform: [{rotate: '45deg'}],
  },
  ring: {
    marginLeft: 7,
    marginBottom: 15,
    resizeMode: 'stretch',
    width: 71,
    height: 17,
  },
});

export default StartupScreen;
