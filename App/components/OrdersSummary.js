import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import Card from '../components/UI/Card';
import CopyableText from './UI/CopyableText';
import {generateComment} from '../helpers/textGenerators';

const OrdersSummary = ({orders}) => {
  const user = useSelector(state => state.user.user);
  const ordersState = useSelector(state => state.orders.orders);

  let count = 0;
  if (user.isAdmin) {
    count = ordersState.filter(order => order.paymentSuccess).length;
  }
  const {length} = orders;

  const comment = generateComment(orders);

  return (
    <View style={{alignItems: 'center'}}>
      <Card style={styles.comment}>
        <Text>
          რაოდენობა: <Text style={styles.text}>{length}</Text>
        </Text>
        {user.isAdmin && (
          <Text>
            წარმატებული გადახდები: <Text style={styles.text}>{count}</Text>
          </Text>
        )}
        <Text>
          თანხა: <Text style={styles.text}>{length * 9}</Text>
        </Text>
        <Text style={{textAlign: 'center'}}>
          კომენტარი საშაურმეს (გონებაშეზღუდულთათვის):
        </Text>
        <CopyableText text={comment} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    alignItems: 'center',
  },
  text: {fontWeight: 'bold', fontSize: 15},
});

export default OrdersSummary;
