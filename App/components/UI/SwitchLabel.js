import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const IngredientSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.Color}>{props.label}</Text>
      <Switch
       trackColor="#FF5908"
       thumbColor="#ccc"
       thumbColor="#FF5908"
        value={props.state}
        onValueChange={props.toggleSwitch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginVertical: 5
  },
  Color :{
    color: '#000',
    fontWeight:'bold'
  }
});

export default IngredientSwitch;
