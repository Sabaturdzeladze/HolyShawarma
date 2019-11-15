import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import OrdersSummary from '../components/OrdersSummary';
import Colors from '../Constants/Colors';
import * as ordersActions from '../../store/actions/orders';
import Loading from '../components/UI/Loading';

const OrdersSummaryScreen = props => {
  const [loading, setLoading] = useState(true);

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orders.length) return setLoading(false);
    const fetchOrders = async () => {
      try {
        setLoading(true);
        await dispatch(ordersActions.fetchOrders());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showMessage({
          message: 'Error fetching data',
        });
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Loading size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
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
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersSummaryScreen;
