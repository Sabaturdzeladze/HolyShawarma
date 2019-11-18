import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
      <View>
        <View style={styles.header}>
          {!user.isAdmin ? (
            <View style={styles.userPlace}>
              <Text style={styles.user}>
                User : <Text style={styles.userName}>{item.user.userName}</Text>
              </Text>
            </View>
          ) : (
            <SwitchLabel
              label={`User: ${item.user.userName}`}
              state={checked}
              toggleSwitch={paymentChangeHandler}
            />
          )}
        </View>
        <View style={styles.textPlace}>
          <Text style={styles.text}>{txt}</Text>
        </View>
      </View>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  card : {
    flexDirection:'row',
    justifyContent :'space-between',
    marginVertical: 6
  },
  userPlace: {
    padding: 5,
  },
  removeWrapper: {
    paddingTop: 10,
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
    color: '#FF5908',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    alignItems: 'center',
  },
});

export default OrderItem;
