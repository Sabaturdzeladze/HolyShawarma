import React from 'react';
import {View, Text} from 'react-native';

const OrdersScreen = props => {
  return (
    <View>
      <Text>Order Screen</Text>
    </View>
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'შეკვეთები',
    headerTitleStyle: {
      fontSize: 15
    }
  }
}

export default OrdersScreen;
