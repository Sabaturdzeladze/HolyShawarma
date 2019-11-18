import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import Card from '../components/UI/Card';
import CopyableText from './UI/CopyableText';
import {generateComment} from '../helpers/textGenerators';
import Colors from '../Constants/Colors';

const OrdersDescription = ({ordersDetails}) => {
  return (
    <View>
      {Object.keys(ordersDetails).map(text => {
        const element = ordersDetails[text];
        return <Text key={text}>{`${element.quantity} - ${text}`}</Text>;
      })}
    </View>
  );
};

const OrdersSummary = ({orders}) => {
  const user = useSelector(state => state.user.user);
  const ordersState = useSelector(state => state.orders.orders);

  let count = 0;
  if (user.isAdmin) {
    count = ordersState.filter(order => order.paymentSuccess).length;
  }
  const {length} = orders;

  const ordersSummary = generateComment(orders);

  return (
    <View style={styles.screen}>
      <Card style={styles.comment}>
        <View style={styles.modalbox}>
          <Text style={styles.orderQuantity}>
            რაოდენობა: <Text style={styles.text}>{length}</Text>
          </Text>
          {user.isAdmin && (
            <Text>
              წარმატებული გადახდები: <Text style={styles.text}>{count}</Text>
            </Text>
          )}
          <Text style={styles.textPrice}>
            თანხა: <Text style={styles.text}>{length * 9} </Text> ლარი
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={{paddingLeft: 10, paddingTop: 10}}>
            კომენტარი საშაურმეს{' '}
            <Text style={styles.brainless}>(გონებაშეზღუდულთათვის)</Text>:
          </Text>
          <CopyableText text={ordersSummary.fullText}>
            <OrdersDescription ordersDetails={ordersSummary.ordersDetails} />
          </CopyableText>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  modalbox: {
    borderBottomColor: 'rgba(228 , 118, 118 , 0.4)',
    borderBottomWidth: 1,
    width: '100%',
    padding: 10,
    paddingLeft: 15,
  },
  brainless: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  orderQuantity: {
    paddingTop: 10,
  },
  description: {
    paddingLeft: 5,
    paddingBottom: 10
  },
  comment: {padding: 0},
  text: {fontWeight: 'bold', fontSize: 15},
  textPrice: {
    fontSize: 15,
    marginTop: 10,
    paddingBottom: 10,
  },
});

export default OrdersSummary;
