import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeNavigator from './HomeNavigation';
import OrderNavigator from './OrderNavigation';
import Colors from '../Constants/Colors';

const BottomNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="home" size={20} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: Colors.primary,
        },
        tabBarLabel: 'სახლი',
      };
    },
  },
  Orders: {
    screen: OrderNavigator,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: ({tintColor}) => {
          return <Icon name="shopping-cart" size={20} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: Colors.primary,
        },
        tabBarLabel: 'გადასარტყამები',
      };
    },
  },
});

export default BottomNavigator;
