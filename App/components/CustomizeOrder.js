import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';

import Card from './UI/Card';
import SwitchLabel from './UI/SwitchLabel';
import ActionButton from './UI/ActionButton';
import * as orderActions from '../../store/actions/orders';
import Colors from '../Constants/Colors';

const CustomizeOrder = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [withOnion, setWithOnion] = useState(false);
  const [spicy, setSpicy] = useState(false);
  const [mayonnaise, setMayonnaise] = useState(true);
  const [ketchup, setKetchup] = useState(true);
  const [wet, setWet] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const setOrderState = async () => {
      const order = JSON.parse(await AsyncStorage.getItem('order'));
      if (!order) return;
      setWithOnion(order.onion);
      setMayonnaise(order.mayonnaise);
      setKetchup(order.ketchup);
      setWet(order.wet);
      setSpicy(order.spicy);
    };
    setOrderState();
  }, []);

  const placeOrderHandler = async () => {
    setIsLoading(true);
    const order = {
      spicy,
      mayonnaise,
      ketchup,
      wet,
      onion: withOnion,
    };
    try {
      await dispatch(orderActions.sendOrder(order));
      setIsLoading(false);
      showMessage({
        message: 'შეკვეთა წარმატებით გაიგზავნა',
        position: {
          left: 50,
          right: 50,
          bottom: 55,
        },
      });
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: 'შეკვეთა ვერ გაიგზავნა',
        position: {
          left: 60,
          right: 60,
          bottom: 55,
        }
      });
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
        toggleSwitch={value => {
          setMayonnaise(value);
          if (!value && !ketchup) setWet(false);
        }}
        state={mayonnaise}
      />
      <SwitchLabel
        label="კეტჩუპით"
        toggleSwitch={value => {
          setKetchup(value);
          if (!value && !mayonnaise) setWet(false);
        }}
        state={ketchup}
      />
      <SwitchLabel
        label="სოველი"
        toggleSwitch={value => {
          setWet(value);

          if (!wet) {
            setKetchup(value);
            setMayonnaise(value);
          }
        }}
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
  button: {
    backgroundColor: Colors.primary,
  },
});

export default CustomizeOrder;
