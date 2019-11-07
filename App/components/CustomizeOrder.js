import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import Card from './UI/Card';
import Loading from './UI/Loading';
import IngredientSwitch from './UI/IngredientSwitch';
import ActionButton from './UI/ActionButton';

const CustomizeOrder = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [withOnion, setWithOnion] = useState(false);
  const [spicy, setSpicy] = useState(false);
  const [mayonnaise, setMayonnaise] = useState(true);
  const [ketchup, setKetchup] = useState(true);
  const [wet, setWet] = useState(false);

  const placeOrderHandler = () => {
    setIsLoading(true);
    const order = {
      spicy,
      mayonnaise,
      ketchup,
      wet,
    };
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    console.log(order);
  };

  return (
    <Card style={styles.card}>
      <IngredientSwitch
        label="ხახვით"
        toggleSwitch={value => setWithOnion(value)}
        state={withOnion}
      />
      <IngredientSwitch
        label="ცხარე"
        toggleSwitch={value => setSpicy(value)}
        state={spicy}
      />
      <IngredientSwitch
        label="მაიონეზით"
        toggleSwitch={value => setMayonnaise(value)}
        state={mayonnaise}
      />
      <IngredientSwitch
        label="კეტჩუპით"
        toggleSwitch={value => setKetchup(value)}
        state={ketchup}
      />
      <IngredientSwitch
        label="სველი"
        toggleSwitch={value => setWet(value)}
        state={wet}
      />
      <View style={styles.action}>
        <ActionButton
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
});

export default CustomizeOrder;
