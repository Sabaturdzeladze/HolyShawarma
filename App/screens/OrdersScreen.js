import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as ordersActions from '../../store/actions/orders';
import OrderItem from '../components/UI/OrderItem';
import OrdersSummary from '../components/OrdersSummary';
import Loading from '../components/UI/Loading';
import Colors from '../Constants/Colors';

const OrdersScreen = props => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  const fetchOrders = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    setLoading(true);
    fetchOrders()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [setLoading, fetchOrders]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Loading size="large" color="#000" />
      </View>
    );
  }

  if (!orders) {
    return (
      <View style={styles.screen}>
        <Text>შეკვეთები ვერ მოიძებნა</Text>
      </View>
    );
  }

  return (
    <>
      <OrdersSummary orders={orders} />
      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={({item}) => <OrderItem item={item} />}
        refreshing={isRefreshing}
        onRefresh={fetchOrders}
      />
    </>
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'შეკვეთები',
    headerTitleContainerStyle: {
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitleStyle: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
