import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CustomModal from './CustomModal';
import ActionButton from './ActionButton';
import Card from './Card';

const ConfirmationModal = ({children, ...props}) => {
  return (
    <CustomModal {...props}>
      {children}
      <View style={styles.actionsContainer}>
        <ActionButton onPress={props.onConfirm} title="Confirm" />
        <ActionButton onPress={props.onCancel} title="Cancel" />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});
export default ConfirmationModal;
