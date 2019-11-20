import AsyncStorage from '@react-native-community/async-storage';

import env from '../../env';
import http from '../../App/helpers/requestHelper';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const SEND_ORDER = 'SEND_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const SET_PAYMENT_SUCCESS = 'SET_PAYMENT_SUCCESS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await http.get(env.ordersUrl);
      dispatch({
        type: FETCH_ORDERS,
        orders: data.orders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const sendOrder = order => {
  return async (dispatch, getState) => {
    const user = getState().user.user;
    const newOrder = {
      ...order,
      user: {
        userName: user.userName,
        _id: user._id,
      },
    };

    try {
      const {data} = await http.post(env.ordersUrl, newOrder);
      await AsyncStorage.setItem('order', JSON.stringify(order));
      dispatch({
        type: SEND_ORDER,
        order: data.order,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const removeOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await http.del(`${env.ordersUrl}/${orderId}`);

      dispatch({
        type: DELETE_ORDER,
        order: data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const setPaymentForOrder = (orderId, paymentSuccess) => {
  return async dispatch => {
    try {
      const {data} = await http.put(`${env.ordersUrl}/${orderId}`, {
        updates: {paymentSuccess},
      });

      dispatch({
        type: SET_PAYMENT_SUCCESS,
        orderId,
        paymentSuccess,
      });
    } catch (error) {
      throw error;
    }
  };
};
