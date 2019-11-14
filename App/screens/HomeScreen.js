import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import Card from '../components/UI/Card';
import CopyableText from '../components/UI/CopyableText';
import CustomizeOrder from '../components/CustomizeOrder';
import * as userActions from '../../store/actions/user';
import Colors from '../Constants/Colors';

const HomeScreen = props => {
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  const dispatch = useDispatch();

  const {navigation} = props;

  const logoutHandler = useCallback(async () => {
    await dispatch(userActions.logout());
    navigation.navigate('Auth');
  }, [dispatch, navigation]);

  useEffect(() => {
    navigation.setParams({logout: logoutHandler});
  }, [dispatch]);
  
  const successChangeHandler = () => {
    setOrderSuccessful(prevState => !prevState);
  };

  useEffect(() => {
    if (orderSuccessful) {
      setTimeout(() => {
        setOrderSuccessful(false);
      }, 1000);
    }
  }, [orderSuccessful])

  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.accounts}>
        <CopyableText text="TBC: " account="GE04TB7425645061600033" />
        <CopyableText text=" BG: " account="GE04TB7425645061600033" />
      </Card>
      <CustomizeOrder onSuccessChange={successChangeHandler} />

      {orderSuccessful && (
        <View style={styles.success}>
          <Icon name="check-circle" size={30} color="green" />
        </View>
      )}
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  const logout = navData.navigation.getParam('logout');

  return {
    headerTitle: 'დაამატე შეკვეთა',
    headerTitleContainerStyle: {
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    headerTitleStyle: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
    },
    headerRight: <Icon name="logout" color="#fff" size={23} onPress={logout} />,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  success: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
