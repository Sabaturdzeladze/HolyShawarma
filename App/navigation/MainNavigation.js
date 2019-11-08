import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import BottomNavigator from './BottomNavigator';

const MainNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Home: BottomNavigator
});

export default createAppContainer(MainNavigator);
