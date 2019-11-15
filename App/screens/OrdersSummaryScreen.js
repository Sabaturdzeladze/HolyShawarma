import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import OrdersSummary from '../components/OrdersSummary';
import Colors from '../Constants/Colors';

const OrdersSummaryScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.heading}>შეკვეთის დეტალები</Text>
      </View>
      <View style={styles.screen}>
        <OrdersSummary orders={orders} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersSummaryScreen;
