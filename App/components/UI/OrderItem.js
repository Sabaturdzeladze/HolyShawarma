import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import Card from './Card';
import SwitchLabel from './SwitchLabel';
import * as ordersActions from '../../../store/actions/orders';
import {generateOrderText} from '../../helpers/textGenerators';
import Colors from '../../Constants/Colors';

const OrderItem = ({item}) => {
  const [checked, setChecked] = useState(item.paymentSuccess);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const txt = generateOrderText(item);

  const removeOrderHandler = useCallback(() => {
    dispatch(ordersActions.removeOrder(item._id));
  }, [dispatch, item]);

  const paymentChangeHandler = async state => {
    try {
      await dispatch(ordersActions.setPaymentForOrder(item._id, state));
      setChecked(state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        {!user.isAdmin ? (
          <View style={styles.userPlace}>
            <Text style={styles.user}>
             <Text style={styles.userName}>{item.user.userName}</Text>
            </Text>
          </View>
        ) : (
          <SwitchLabel
            label={`User: ${item.user.userName}`}
            state={checked}
            toggleSwitch={value => paymentChangeHandler(value)}
          />
        )}
        {user._id === item.user._id && (
          <View style={styles.removeWrapper}>
            <Icon
              size={28}
              name="delete"
              color={Colors.primary}
              onPress={removeOrderHandler}
            />
          </View>
        )}
      </View>
      <View style={styles.textPlace}>
        <Text style={styles.text}>{txt}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(228 , 118, 118 , 0.4)',
    borderBottomWidth: 1,
    padding: 5
  },
  userPlace: {
    padding: 5,
  },
  removeWrapper: {

    alignItems: 'center',
    paddingRight: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  user: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  userName: {
    color: '#F7584E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    alignItems: 'center',
    color:'#707070'
  },
  textPlace: {
    paddingTop: 10,
    paddingBottom: 15 ,
    paddingLeft: 10
  }
});

export default OrderItem;
