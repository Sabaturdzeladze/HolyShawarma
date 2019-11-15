import React from 'react';
import Auth from '../../components/Auth';

const LoginScreen = props => {
  return <Auth method="login" navigation={props.navigation} />;
};

export default LoginScreen;
