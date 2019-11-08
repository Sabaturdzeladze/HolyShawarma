import env from '../../env';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';

export const userLogin = user => {
  return async dispatch => {
    try {
      let response = await fetch(env.serverUrl + 'login', user);
      const loggedInUser = await response.json();
      return dispatch({type: USER_LOGIN, user: loggedInUser});
    } catch (error) {
      throw error;
    }
  };
};
