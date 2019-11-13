import {USER_LOGIN} from '../actions/user';
import {USER_LOGOUT} from '../actions/user';

let initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {user: action.user};
    case USER_LOGOUT:
      return {...initialState};
  }

  return state;
};
