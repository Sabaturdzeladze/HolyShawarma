import AsyncStorage from '@react-native-community/async-storage';

import env from '../../env';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const SEND_ORDER = 'SEND_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const SET_PAYMENT_SUCCESS = 'SET_PAYMENT_SUCCESS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const res = await fetch(env.ordersUrl);
      const data = await res.json();
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
      const res = await fetch(env.ordersUrl, {
        method: 'POST',
        body: JSON.stringify(newOrder),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.status >= 400) {
        throw new Error(data.error);
      } else {
        await AsyncStorage.setItem('order', JSON.stringify(order));
        dispatch({
          type: SEND_ORDER,
          order: data.order,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const removeOrder = orderId => {
  return async dispatch => {
    try {
      const res = await fetch(`${env.ordersUrl}/${orderId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.status >= 400) {
        throw new Error(data.error);
      } else {
        dispatch({
          type: DELETE_ORDER,
          order: data,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const setPaymentForOrder = (orderId, paymentSuccess) => {
  return async dispatch => {
    try {
      const res = await fetch(`${env.ordersUrl}/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({updates: {paymentSuccess}}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.status >= 400) {
        throw new Error(data.error);
      } else {
        dispatch({
          type: SET_PAYMENT_SUCCESS,
          orderId,
          paymentSuccess,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};
