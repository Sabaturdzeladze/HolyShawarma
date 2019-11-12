import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerRight: (
        <Icon name="logout" size={23} color="#fff" onPress={() => {}} />
      ),
      headerRightContainerStyle: {
        backgroundColor: '#FF5908',
        width: '15%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
      },
    },
  },
});

export default HomeNavigator;
