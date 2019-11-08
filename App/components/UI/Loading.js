import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = props => {
  return <ActivityIndicator size="small" color="#ffffff" {...props} />;
};

export default Loading;
