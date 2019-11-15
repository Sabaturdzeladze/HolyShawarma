import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from '../screens/auth/LoginScreen';
import Colors from '../Constants/Colors';
import SignupScreen from '../screens/auth/SignupScreen';

const AuthNavigator = createBottomTabNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="login" size={20} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: Colors.primary,
        },
        tabBarLabel: 'შესვლა',
      };
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="login" size={20} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: Colors.primary,
        },
        tabBarLabel: 'რეგისტრაცია',
      };
    },
  },
});

export default AuthNavigator;
