import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import MainNavigation from './navigation/MainNavigation';
import userReducer from '../store/reducers/user';
import ordersReducer from '../store/reducers/orders';

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;