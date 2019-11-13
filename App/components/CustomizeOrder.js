import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import Card from './UI/Card';
import SwitchLabel from './UI/SwitchLabel';
import ActionButton from './UI/ActionButton';
import * as orderActions from '../../store/actions/orders';

const CustomizeOrder = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [withOnion, setWithOnion] = useState(false);
  const [spicy, setSpicy] = useState(false);
  const [mayonnaise, setMayonnaise] = useState(true);
  const [ketchup, setKetchup] = useState(true);
  const [wet, setWet] = useState(false);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    setIsLoading(true);
    const order = {
      spicy,
      mayonnaise,
      ketchup,
      wet,
      onion: withOnion
    };
    try {
      await dispatch(orderActions.sendOrder(order));
      props.onSuccessChange();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Card style={styles.card}>
      <SwitchLabel
        label="ხახვით"
        toggleSwitch={value => setWithOnion(value)}
        state={withOnion}
      />
      <SwitchLabel
        label="ცხარე"
        toggleSwitch={value => setSpicy(value)}
        state={spicy}
      />
      <SwitchLabel
        label="მაიონეზით"
        toggleSwitch={value => setMayonnaise(value)}
        state={mayonnaise}
      />
      <SwitchLabel
        label="კეტჩუპით"
        toggleSwitch={value => setKetchup(value)}
        state={ketchup}
      />
      <SwitchLabel
        label="სველი"
        toggleSwitch={value => setWet(value)}


        state={wet}
      />
      <View style={styles.action}>
        <ActionButton
        style={styles.button}
          title="დამატება"
          onPress={placeOrderHandler}
          loading={isLoading}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  action: {
    marginTop: 20,
  },
  button : {
    backgroundColor : '#FF5908'
  }
});

export default CustomizeOrder;
