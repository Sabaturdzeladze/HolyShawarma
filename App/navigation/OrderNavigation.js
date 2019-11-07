import {createStackNavigator} from 'react-navigation-stack';

import OrdersScreen from '../screens/OrdersScreen';

const OrderNavigator = createStackNavigator({
  Order: OrdersScreen
});

export default OrderNavigator;
