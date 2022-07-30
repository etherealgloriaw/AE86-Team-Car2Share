import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
const googleSuccess = async (res) => {
  const result = res?.profileObj;
  const token = res?.tokenId;
  console.log(result);
  console.log(token);

  try {
    // dispatch({ type: 'AUTH', data: { result, token } });
    // history.push('/');
  } catch (error) {
    console.log(error);
  }
};

const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

function Login() {
    return (
        <GoogleLogin
        clientId="114616124253-5fh3igdgbmrbk3gniubg47o4bssc11cq.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button  color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
            <AccountCircle />
            Google Sign In
          </Button>
        )} //className={classes.googleButton}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
      />
    );
  }
  
  export default Login;