import {FETCH_ORDERS, SEND_ORDER, DELETE_ORDER} from '../actions/orders';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case SEND_ORDER:
      const updatedOrders = [...state.orders];
      updatedOrders.push(action.order);

      return {
        ...state,
        orders: updatedOrders,
      };
    case DELETE_ORDER:
      const updatedAfterRemoveOrders = state.orders.filter(
        order => order._id !== action.order._id,
      );

      return {
        ...state,
        orders: updatedAfterRemoveOrders,
      };
  }

  return state;
};
