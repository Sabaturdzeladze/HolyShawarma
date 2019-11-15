import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignupIcon from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/auth/LoginScreen';
import Colors from '../Constants/Colors';
import SignupScreen from '../screens/auth/SignupScreen';

const AuthNavigator = createBottomTabNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor, focused}) => {
          return <Icon name="login" size={20} color={focused ? tintColor : '#ccc'} />;
        },
        tabBarLabel: 'შესვლა',
      };
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor, focused}) => {
          return <SignupIcon name="md-person-add" size={20} color={focused ? tintColor : '#ccc'} />;
        },
        tabBarLabel: 'რეგისტრაცია',
      };
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: Colors.primary,
    inactiveBackgroundColor: Colors.primary,
  }
});

export default AuthNavigator;
