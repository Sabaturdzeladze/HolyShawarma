import {USER_LOGIN} from '../actions/user';
import {USER_LOGOUT} from '../actions/user';
import AsyncStorage from '@react-native-community/async-storage';

let initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      AsyncStorage.setItem('username', action.user.userName);
      AsyncStorage.setItem('password', action.user.password);
      return {user: action.user};
    case USER_LOGOUT:
      AsyncStorage.removeItem('username');
      AsyncStorage.removeItem('password');
      return {...initialState};
  }

  return state;
};
