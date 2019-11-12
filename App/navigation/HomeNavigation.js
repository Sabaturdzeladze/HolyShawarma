import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
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
