import {FETCH_ORDERS, SEND_ORDER} from '../actions/orders';

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
  }

  return state;
};
