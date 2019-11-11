import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Card from './Card';
import SwitchLabel from './SwitchLabel';

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

  const txt = generateText(item);

  return (
    <Card>
      <View style={styles.header}>
        <SwitchLabel
          label={`User: ${item.user}`}
          state={checked}
          toggleSwitch={value => setChecked(value)}
        />
      </View>
      <Text>{txt}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {},
});

export default OrderItem;
