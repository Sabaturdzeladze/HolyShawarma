import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import Colors from '../Constants/Colors';

import CopyableText from './UI/CopyableText';
import Card from './UI/Card';
import AnimatedInputLabel from '../components/UI/AnimatedInputLabel';
import ActionButton from './UI/ActionButton';
import Loading from './UI/Loading';
import env from '../../env';
import http from '../helpers/requestHelper';

const BankAccounts = props => {
  const [loading, setLoading] = useState(false);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const [tbc, setTbc] = useState('');
  const [bog, setBog] = useState('');
  const [tbcInput, setTbcInput] = useState('');
  const [bogInput, setBogInput] = useState('');

  const user = useSelector(props => props.user.user);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const {data} = await http.get(`${env.usersUrl}/accounts`);
        setTbc(data.tbc);
        setBog(data.bog);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showMessage({
          message: 'Error getting accounts',
        });
      }
    };
    fetchAccounts();
  }, []);

  const setAccountsHandler = async () => {
    try {
      setFormIsSubmitting(true);
      const res = await fetch(`${env.usersUrl}/account/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tbc: tbcInput,
          bog: bogInput,
        }),
      });

      if (res.status >= 400) throw new Error('');

      const data = await res.json();
      setTbc(data.tbc);
      setBog(data.bog);
      setTbcInput('');
      setBogInput('');
      setFormIsSubmitting(false);
    } catch (error) {
      setFormIsSubmitting(false);
      showMessage({
        message: 'Error setting accounts',
      });
    }
  };

  return (
    <>
      {props.children}

      {user.isAdmin && (
        <Card style={{ padding: 20 }}>
          <AnimatedInputLabel
            label="TBC"
            value={tbcInput}
            onChangeText={value => setTbcInput(value)}
            labelStyle={styles.spaceOnTop}
          />
          <AnimatedInputLabel
            label="BOG"
            value={bogInput}
            onChangeText={value => setBogInput(value)}
            containerStyle={{ marginTop: 15 }}
          />
          <ActionButton
            loading={formIsSubmitting}
            title="შეცვლა"
            style={styles.color}
            onPress={setAccountsHandler}
          />
        </Card>
      )}
      <Card style={styles.screen}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CopyableText text="TBC: " account={tbc} />
            <CopyableText text="BOG: " account={bog} />
          </>
        )}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    minHeight: 100,
  },
  spaceOnTop: {
    marginTop: 6,
  },
  color: {
    marginTop: 6,
    backgroundColor: Colors.primary,
  },
});

export default BankAccounts;
