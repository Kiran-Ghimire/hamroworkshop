import React from 'react';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import {Button} from '@material-ui/core';

 
 

 
const GoogleLog = () => {
    const responseGoogle = (response) => {
        console.log(response.xt);
      }
      return(
    <GoogleLogin
    clientId='1072277836279-pcfl7h6r57kg2n6cpoj6bvqo6rekfd8c.apps.googleusercontent.com'
    render={renderProps => (
      <Button  onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle size={20} style={{marginRight:'0.5rem'}} /> Continue with Google</Button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  );
}
  
export default GoogleLog;