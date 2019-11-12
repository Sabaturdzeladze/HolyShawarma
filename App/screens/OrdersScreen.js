import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as ordersActions from '../../store/actions/orders';
import OrderItem from '../components/UI/OrderItem';
import OrdersSummary from '../components/OrdersSummary';
import Loading from '../components/UI/Loading';

const OrdersScreen = props => {
  const [loading, setLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        await dispatch(ordersActions.fetchOrders());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [setLoading]);

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
      {orders && <OrdersSummary orders={orders} />}
      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={({item}) => <OrderItem item={item} />}
      />
    </>
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'შეკვეთები',
    headerTitleContainerStyle:{
      backgroundColor:'#FF5908',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitleStyle: {
      fontSize: 15,
      color:'#fff',
      fontWeight: 'bold'
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
