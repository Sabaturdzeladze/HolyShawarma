import AsyncStorage from '@react-native-community/async-storage';

import env from '../../env';
import http from '../../App/helpers/requestHelper';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGOUT = 'USER_LOGOUT';

export const login = user => {
  return async dispatch => {
    try {
      const {data} = await http.post(`${env.localUsersUrl}/login`, {user});
      await AsyncStorage.setItem('username', user.userName);
      await AsyncStorage.setItem('password', user.password);
      return dispatch({type: USER_LOGIN, user: data});
    } catch (error) {
      throw error;
    }
  };
};

export const signup = user => {
  return async dispatch => {
    try {
      const {data} = await http.post(`${env.localUsersUrl}/register`, {user});
      return dispatch({type: USER_LOGIN, user: data});
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem('password');
  return {type: USER_LOGOUT};
};
