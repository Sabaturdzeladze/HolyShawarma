import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import BottomNavigator from './BottomNavigator';
import StartupScreen from '../screens/StartupScreen';
import AuthNavigator from './AuthNavigation';

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Home: BottomNavigator,
});

export default createAppContainer(MainNavigator);
