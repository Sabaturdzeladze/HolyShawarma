import env from '../../env';

export const FETCH_ORDERS = 'FETCH_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const res = await fetch(env.serverUrl + 'orders');
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
