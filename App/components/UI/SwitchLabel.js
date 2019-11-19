import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

const IngredientSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.Color}>
        <Text style={styles.user}></Text>
        {props.label}
      </Text>
      <Switch
        trackColor={{true : Colors.primary , false : '#ccc'}}
        thumbColor="#ccc"
        thumbColor={Colors.primary}
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
    marginVertical: 5,
  },
  Color: {
    fontSize: 13,
    color: '#000',
    padding: 5,
  },
  user: {
    color: '#000',
    fontSize: 17,
  },
});

export default IngredientSwitch;
