import AsyncStorage from '@react-native-community/async-storage';

import env from '../../env';
import http from '../../App/helpers/requestHelper';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGOUT = 'USER_LOGOUT';

export const login = user => {
  return async dispatch => {
    try {
      const {data} = await http.post(`${env.usersUrl}/login`, {user});
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('username', user.userName);
      return dispatch({type: USER_LOGIN, user: data.user});
    } catch (error) {
      throw error;
    }
  };
};

export const autoLogin = () => {
  return async dispatch => {
    try {
      const {data} = await http.post(`${env.usersUrl}/auto-login`, {});
      return dispatch({ type: USER_LOGIN, user: data.user });
    } catch (error) {
      throw error;
    }
  };
};

export const signup = user => {
  return async dispatch => {
    try {
      await http.post(`${env.usersUrl}/register`, {user});
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem('token');
  return {type: USER_LOGOUT};
};
