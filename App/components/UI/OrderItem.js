import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import Card from './Card';
import SwitchLabel from './SwitchLabel';
import * as ordersActions from '../../../store/actions/orders';
import {generateOrderText} from '../../helpers/textGenerators';
import Colors from '../../Constants/Colors';
import Loading from './Loading';

const OrderItem = ({item}) => {
  const [checked, setChecked] = useState(item.paymentSuccess);
  const [deleting, setDeleting] = useState(false);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const txt = generateOrderText(item);

  const removeOrderHandler = useCallback(() => {
    const removeItem = async () => {
      try {
       if(item.paymentSuccess){
        showMessage({message: 'შეკვეთის თანხა გადახდილია!', position: {
          left: 60,
          right: 60,
          bottom: 55
        }})
       }else{
        setDeleting(true);
        await dispatch(ordersActions.removeOrder(item._id));
        showMessage({message: 'შეკვეთა წაიშალა.'});
       }
      } catch (error) {
        setDeleting(false);
        showMessage({message: 'შეკვეთა ვერ წაიშალა.'});
      }
    };
    removeItem();
  }, [dispatch, item]);

  const paymentChangeHandler = async state => {
    try {
      await dispatch(ordersActions.setPaymentForOrder(item._id, state));
      setChecked(state);
    } catch (error) {
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        {!user.isAdmin ? (
          <View style={styles.userPlace}>
            <Text style={styles.user}>
              <Text style={styles.userName}>{item.user.userName}</Text>
            </Text>
          </View>
        ) : (
          <SwitchLabel 
          style={styles.Admin}
            label={item.user.userName}
            state={checked}
            toggleSwitch={value => paymentChangeHandler(value)}
          />
        )}
        {user._id === item.user._id && (
          <View style={styles.removeWrapper}>
            {deleting ? (
              <Loading color={Colors.primary} />
            ) : (
              <Icon
                size={28}
                name="delete"
                color={Colors.primary}
                onPress={() => {
                  Alert.alert(
                    'მოიცა !',
                    'ჰა დაფიქრდი, არ გინდა, რომ გადაირტყა?',
                    [
                      {text: 'კაი ხო', style: 'cancel'},
                      {text: 'შეკვეთას ვცვლი კაცო', onPress: removeOrderHandler},
                    ],
                  );
                }}
              />
            )}
          </View>
        )}
      </View>
      <View style={styles.textPlace}>
        <Text style={styles.text}>{txt}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(228 , 118, 118 , 0.4)',
    borderBottomWidth: 1,
    padding: 5,
  },
  userPlace: {
    padding: 5,
  },
  removeWrapper: {
    alignItems: 'center',
    paddingRight: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  user: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  userName: {
    color: '#F7584E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    alignItems: 'center',
    color: '#707070',
  },
  textPlace: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  Admin: {
    color: Colors.primary
  }
});

export default OrderItem;
