import React from 'react';
import {View, Text} from 'react-native';

import CopyableText from './UI/CopyableText';

const OrdersSummary = ({orders}) => {
  const {length} = orders;
  
  return (
    <View>
      <Text>რაოდენობა: {length}</Text>
      <Text>თანხა: {length * 9}</Text>
      <Text>კომენტარი საშაურმეს (გონებაშეზღუდულთათვის):</Text>
      <CopyableText />
    </View>
  );
};

export default OrdersSummary;
