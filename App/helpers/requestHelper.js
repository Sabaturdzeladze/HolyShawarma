import AsyncStorage from '@react-native-community/async-storage';

const errorHandler = async res => {
  try {
    if (res.status === 401) {
      AsyncStorage.removeItem('token');
      throw new Error('Unauthorized');
    }
    const data = await res.json();
    if (res.status >= 400) {
      throw new Error(data.error);
    }
    return {data, res};
  } catch (error) {
    throw error.message;
  }
};

const get = async url => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(url, {
      headers: {
        authorization: token,
      },
    });

    return await errorHandler(res);
  } catch (error) {
    throw error;
  }
};

const post = async (url, body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    return await errorHandler(res);
  } catch (error) {
    throw error;
  }
};

const put = async (url, body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    return await errorHandler(res);
  } catch (error) {
    throw error;
  }
};

const del = async (url, body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    return await errorHandler(res);
  } catch (error) {
    throw error;
  }
};

export default {
  get,
  post,
  put,
  del,
};
