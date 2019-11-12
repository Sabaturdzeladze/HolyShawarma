import env from '../../env';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';

export const login = user => {
  return async dispatch => {
    try {
      let response = await fetch(env.serverUrl + 'login', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.status >= 400) {
        throw new Error(data.error);
      } else {
        return dispatch({type: USER_LOGIN, user: data});
      }
    } catch (error) {
      throw error;
    }
  };
};

export const signup = user => {
  return async dispatch => {
    try {
      let response = await fetch(env.serverUrl + 'register', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.status >= 400) {
        throw new Error(data.error);
      } else {
        return dispatch({type: USER_LOGIN, user: data});
      }
    } catch (error) {
      throw error;
    }
  };
}