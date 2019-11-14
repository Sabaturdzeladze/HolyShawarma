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
    <Card>
      <View style={styles.header}>
        {!user.isAdmin ? (
          <Text>User: {item.user.userName}</Text>
        ) : (
          <SwitchLabel
            label={`User: ${item.user.userName}`}
            state={checked}
            toggleSwitch={value => paymentChangeHandler(value)}
          />
        )}
      </View>
      <Text>{txt}</Text>
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
  header: {},
  removeWrapper: {
    paddingTop: 10,
    alignItems: 'center',
    paddingRight: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default OrderItem;
