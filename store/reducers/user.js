import {USER_LOGIN} from '../actions/user';
import {USER_LOGOUT} from '../actions/user';
import AsyncStorage from '@react-native-community/async-storage';

let initialState = {
  user: {},
};

export default async (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      await AsyncStorage.setItem('username', action.user.userName);
      await AsyncStorage.setItem('password', action.user.password);
      return {...state, user: action.user};
    case USER_LOGOUT:
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      return {...initialState};
  }

  return state;
};
