import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import * as ordersActions from '../../store/actions/orders';
import OrderItem from '../components/UI/OrderItem';
import Loading from '../components/UI/Loading';
import OrdersSummary from '../components/OrdersSummary';
import CustomModal from '../components/UI/CustomModal';

const OrdersScreen = props => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();
  const {navigation} = props;
  const {length} = orders;

  const showSummaryHandler = useCallback(() => {
    if (!orders.length) {
      return showMessage({
        message: 'შეკვეთები ვერ მოიძებნა',
        position: {
          bottom: 55,
          left: 80,
          right: 80
        }
      });
    }
    setModalIsOpen(true);
  }, [setModalIsOpen, length]);

  useEffect(() => {
    navigation.setParams({showSummary: showSummaryHandler});
  }, [showSummaryHandler]);

  const fetchOrders = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (error) {
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
        <Loading size="large" />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.screen}>
        <Text>შეკვეთები ვერ მოიძებნა</Text>
      </View>
    );
  }

  return (
    <>
      <CustomModal
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}>
        <OrdersSummary orders={orders} request={() => setModalIsOpen(false)} />
      </CustomModal>
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
