/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

import MainNavigation from './navigation/MainNavigation';
import userReducer from '../store/reducers/user'

const store = combineReducers({
  userReducer: userReducer
})

const App = () => {
  return (
    <Provider store = {store}>
      <MainNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
