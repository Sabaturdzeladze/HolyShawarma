import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen
});

export default HomeNavigator;
