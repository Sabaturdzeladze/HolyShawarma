import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import OrdersScreen from '../screens/OrdersScreen';
import Colors from '../Constants/Colors';

const OrderNavigator = createStackNavigator({
  Order: {
    screen: OrdersScreen,
    navigationOptions: navData => ({
      headerTitleContainerStyle: {
        backgroundColor: Colors.primary,
        width: '100%',
      },
      headerRightContainerStyle: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
      },
      headerTitleStyle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      headerRight: (
        <Icon
          name="info-circle"
          color="#fff"
          size={23}
          onPress={navData.navigation.getParam('showSummary')}
        />
      ),
    }),
  },
});

export default OrderNavigator;
