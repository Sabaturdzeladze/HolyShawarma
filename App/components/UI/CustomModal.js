import React from 'react';
import {TouchableOpacity, Modal, StyleSheet} from 'react-native';

const CustomModal = ({children, ...props}) => {
  return (
    <Modal {...props}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.layer}
        onPress={props.onRequestClose}
      >
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  layer: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomModal;
