import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import CustomizeOrder from '../components/CustomizeOrder';
import * as userActions from '../../store/actions/user';
import Colors from '../Constants/Colors';
import BankAccounts from '../components/BankAccounts';

const HomeScreen = props => {
  const dispatch = useDispatch();

  const {navigation} = props;

  const logoutHandler = useCallback(async () => {
    await dispatch(userActions.logout());
    navigation.navigate('Auth');
  }, [dispatch, navigation]);

  useEffect(() => {
    navigation.setParams({logout: logoutHandler});
  }, [dispatch]);

  return (
    <ScrollView style={styles.screen}>
      <BankAccounts>
        <CustomizeOrder />
      </BankAccounts>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  const logout = navData.navigation.getParam('logout');

  return {
    headerTitle: 'გადაირტყი შაურმა',
    headerTitleContainerStyle: {
      backgroundColor: Colors.primary,

      width: '100%',
    },
    headerTitleStyle: {
      fontSize: 18,
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
  button: {
    marginTop: 15,
  },
  input: {
    marginTop: 10,
  },
});

export default HomeScreen;
