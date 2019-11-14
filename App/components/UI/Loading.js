import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from '../../Constants/Colors';

const Loading = props => {
  return <ActivityIndicator size="small" color={Colors.primary} {...props} />;
};

export default Loading;
