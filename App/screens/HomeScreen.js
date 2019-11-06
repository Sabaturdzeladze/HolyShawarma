import React from 'react';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <Icon
        name="search"
        size={20}
        color="black"
      />
    </View>
  );
};

export default HomeScreen;
