import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const Card = props => {
  const {width: initialWidth} = Dimensions.get('window');
  const [width, setWidth] = useState(initialWidth - 32);
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      const {width} = Dimensions.get('window');
      setWidth(width - 32);
    });
    return () => Dimensions.removeEventListener('change');
  }, [initialWidth]);
  return (
    <View style={styles.wrapper}>
      <View style={{width, ...styles.card, ...props.style}}>
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    // shadow only works for ios, elevation is for android
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
  },
});

export default Card;
