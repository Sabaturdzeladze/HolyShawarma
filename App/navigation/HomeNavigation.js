import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import Colors from '../Constants/Colors';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerRightContainerStyle: {
        backgroundColor: Colors.primary,
        width: '15%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
      },
    },
  },
});

export default HomeNavigator;
