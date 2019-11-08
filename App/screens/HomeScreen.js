import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

import Card from '../components/UI/Card';
import CopyableText from '../components/UI/CopyableText';
import CustomizeOrder from '../components/CustomizeOrder';

const HomeScreen = props => {
  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.accounts}>
        <CopyableText text="TBC: " account="GE04TB7425645061600033" />
        <CopyableText text="BG: " account="GE04TB7425645061600033" />
      </Card>
      <CustomizeOrder />
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'დაამატე შეკვეთა',
    headerTitleStyle: {
      fontSize: 15
    }
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  accounts: {
    padding: 10,
    margin: 10
  }
})

export default HomeScreen;
