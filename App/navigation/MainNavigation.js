import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import BottomNavigator from './BottomNavigator';
import StartupScreen from '../screens/StartupScreen';

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthScreen,
  Home: BottomNavigator
}

);

export default createAppContainer(MainNavigator);
