import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeNavigator from './HomeNavigation';
import OrderNavigator from './OrderNavigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';



const BottomNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: () => {
          return <Icon name="home" size={20} color="#FF5908" />;
        },
        tabBarOptions : {
          activeTintColor: '#FF5908'
        }
      };
    },
  },
  Orders: {
    screen: OrderNavigator,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: () => {
          return <Icon name="shopping-cart" size={20} color="#FF5908" />;
        },
        tabBarOptions : {
          activeTintColor: '#FF5908'
        }
      };
    },
  },
});

export default BottomNavigator;
