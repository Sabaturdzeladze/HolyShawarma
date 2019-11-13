import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import Card from './Card';
import SwitchLabel from './SwitchLabel';
import * as ordersActions from '../../../store/actions/orders';

const generateText = order => {
  let txt = '';
  txt += !order.ketchup ? 'კეტჩუპის გარეშე, ' : '';
  txt += !order.mayonnaise ? 'მაიონეზის გარეშე, ' : '';
  txt += order.onion ? 'ხახვით, ' : 'უხახვო, ';
  txt += order.spicy ? 'ცხარე, ' : 'არაცხარე, ';
  txt += order.wet ? 'სველი.' : 'ნორმალურად სველი.';
  return txt;
};

const OrderItem = ({item}) => {
  const [checked, setChecked] = useState(false);
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();

  const txt = generateText(item);

  const removeOrderHandler = useCallback(() => {
    dispatch(ordersActions.removeOrder(item._id));
  }, [dispatch, item]);

  return (
    <Card>
      <View style={styles.header}>
        <SwitchLabel
          label={`User: ${item.user.userName}`}
          state={checked}
          toggleSwitch={value => setChecked(value)}
        />
      </View>
      <Text>{txt}</Text>
      {userId === item.user._id && (
        <View style={styles.removeWrapper}>
          <Icon
            size={23}
            name="remove-circle"
            color="red"
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
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});

export default OrderItem;
