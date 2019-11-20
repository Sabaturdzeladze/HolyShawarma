import React from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import FlashMessage from 'react-native-flash-message';

import MainNavigation from './navigation/MainNavigation';
import userReducer from '../store/reducers/user';
import ordersReducer from '../store/reducers/orders';
import FlashComponent from './components/FlashComponent';
import Colors from './Constants/Colors';

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <MainNavigation />
      <FlashMessage
        position={{bottom: 55, left: 100, right: 100}}
        MessageComponent={FlashComponent}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
