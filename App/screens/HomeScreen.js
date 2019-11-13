import React, { useCallback, useEffect } from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';

import Card from '../components/UI/Card';
import CopyableText from '../components/UI/CopyableText';
import CustomizeOrder from '../components/CustomizeOrder';
import * as userActions from '../../store/actions/user';

const HomeScreen = props => {
  const dispatch = useDispatch();

  const { navigation } = props;
  
  const logout = useCallback(async () => {
    await dispatch(userActions.logout());
    navigation.navigate('Auth');
  }, [dispatch, navigation]);

  useEffect(() => {
    navigation.setParams({ logout });
  }, [dispatch]);
  
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
  const logout = navData.navigation.getParam('logout');
  
  return {
    headerTitle: 'დაამატე შეკვეთა',
    headerTitleContainerStyle: {
      backgroundColor: '#FF5908',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    headerTitleStyle: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
    },
    headerRight: (
      <Icon
        name="logout"
        color="#fff"
        size={23}
        onPress={logout}
      />
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default HomeScreen;
