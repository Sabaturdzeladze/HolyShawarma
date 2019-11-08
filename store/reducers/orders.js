import {FETCH_ORDERS} from '../actions/orders';

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
    default:
      break;
  }

  return state;
};
