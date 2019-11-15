import React from 'react';
import Auth from '../../components/Auth';

const SignupScreen = props => {
  return <Auth method="signup" navigation={props.navigation} />;
};

export default SignupScreen;
