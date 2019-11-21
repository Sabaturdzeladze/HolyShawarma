import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const Card = props => {
  return <View style={styles.wrapper}><View style={{...styles.card, ...props.style}}>{props.children}</View></View>;
};

const styles = StyleSheet.create({
  wrapper : {
    alignItems:'center'
  },
  card: {
    width: width - 32,
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
