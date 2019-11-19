import AsyncStorage from '@react-native-community/async-storage';

export const http = async (url, body, method = 'GET') => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      'Content-Type': 'application/json',
      headers: {
        authorization: token,
      },
    });

    if (res.status === 401) {
      await AsyncStorage.removeItem('token');
      throw new Error({ message: 'Unauthorized' });
    }

    return  await res.json();
  } catch (error) {
    throw error;
  }
};
