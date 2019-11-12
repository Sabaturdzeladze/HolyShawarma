import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Card from '../components/UI/Card';

import CopyableText from './UI/CopyableText';

const OrdersSummary = ({orders}) => {
  const {length} = orders;

  return (
    <View style={{alignItems: 'center'}}>
      <Card style={styles.comment}>
        <Text>
          რაოდენობა:{' '}
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{length}</Text>
        </Text>
        <Text>
          თანხა:{' '}
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{length * 9}</Text>
        </Text>
        <Text style={{textAlign: 'center'}}>
          კომენტარი საშაურმეს (გონებაშეზღუდულთათვის):
        </Text>
        <CopyableText />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    alignItems: 'center',
  },
});

export default OrdersSummary;
