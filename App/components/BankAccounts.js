import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

import CopyableText from './UI/CopyableText';
import Card from './UI/Card';
import Input from './UI/Input';
import ActionButton from './UI/ActionButton';
import Loading from './UI/Loading';
import env from '../../env';

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
        const res = await fetch(`${env.usersUrl}/accounts`);

        if (res.status >= 400) throw new Error('');

        const data = await res.json();
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
      console.log(error);
      setFormIsSubmitting(false);
      showMessage({
        message: 'Error setting accounts',
      });
    }
  };

  return (
    <View>
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
      {user.isAdmin && (
        <Card>
          <Input
            label="TBC"
            value={tbcInput}
            onChangeText={value => setTbcInput(value)}
            style={styles.spaceOnTop}
            labelStyle={styles.spaceOnTop}
          />
          <Input
            label="BOG"
            value={bogInput}
            onChangeText={value => setBogInput(value)}
            style={styles.spaceOnTop}
            labelStyle={styles.spaceOnTop}
          />
          <ActionButton
            loading={formIsSubmitting}
            title="შეცვლა"
            style={styles.spaceOnTop}
            onPress={setAccountsHandler}
          />
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    minHeight: 100,
  },
  spaceOnTop: {
    marginTop: 6
  }
});

export default BankAccounts;
