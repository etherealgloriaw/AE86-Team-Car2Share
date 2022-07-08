import GoogleLogin from 'react-google-login';
import { useState } from 'react';

function Login() {
    return (
        <GoogleLogin
        clientId="114616124253-5fh3igdgbmrbk3gniubg47o4bssc11cq.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
            Google Sign In
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
      />
    );
  }
  
  export default Login;