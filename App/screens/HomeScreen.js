import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../components/UI/Input';

import Card from '../components/UI/Card';
import CopyableText from '../components/UI/CopyableText';
import CustomizeOrder from '../components/CustomizeOrder';
import * as userActions from '../../store/actions/user';
import ActionButton from '../components/UI/ActionButton';
import Colors from '../Constants/Colors';

const HomeScreen = props => {
  const isAdmin = useSelector(props => props.user.user).isAdmin;
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
      <Card style={styles.accounts}>
        <CopyableText text="TBC: " account="GE04TB7425645061600033" />
        <CopyableText text="BOG: " account="GE04TB7425645061600033" />
      </Card>
      {isAdmin && (
        <Card>
          <Input label="TBC" />
          <Input label="BOG" />
          <ActionButton title="შეცვლა" style={styles.button} />
        </Card>
      )}
      <CustomizeOrder />
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
  button: {
    marginTop: 15,
  },
  input: {
    marginTop: 10,
  },
});

export default HomeScreen;
