import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={styles.wrapper}><View style={{...styles.card, ...props.style}}>{props.children}</View></View>;
};

const styles = StyleSheet.create({
  wrapper : {
    alignItems:'center'
  },
  card: {
    width: '92%',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    // shadow only works for ios, elevation is for android
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 10
  },
});

export default Card;
