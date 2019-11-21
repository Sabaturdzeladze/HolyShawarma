import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Easing, Image} from 'react-native';
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
    outputRange: ['20deg', '-10deg', '20deg'],
  });
  const spin2 = rotateAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-20deg', '10deg', '-20deg'],
  });
  const transform = [
    {
      scaleX: zoomRing.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 1],
      }),
    },
    {
      scaleY: zoomRing.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.2, 1],
      }),
    },
  ];

  useEffect(() => {
    const autoAuth = async () => {
      try {
        await dispatch(userActions.autoLogin());
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
            ...styles.wing,
            transform: [{rotate: spin}],
            left: 90,
          }}
        />
        <Image source={shawarma} style={{width: 250, height: 195, resizeMode: 'stretch'}} />
        <Animated.Image
          source={wing_right}
          style={{
            ...styles.wing,
            transform: [{rotate: spin2}],
            right: 84,
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
  wing: {
    top: 30,
    width: 50,
    height: 90,
    position: 'relative',
    resizeMode: 'stretch'
  },
  ring: {
    marginLeft: 7,
    marginBottom: 15,
    resizeMode: 'stretch',
    width: 65,
    height: 16,
  },
});

export default StartupScreen;
