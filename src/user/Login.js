import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { googleUser, loginUser } from '../api';
import { clientId } from '../config';
import { UserContext } from '../Context';

const LoginButton = ({ setUser, setErr }) => {
  const login = useGoogleLogin({
    onSuccess: (res) => {
      setErr(null);
      // authorize
      googleUser(res.access_token).then((user) => {
        localStorage.setItem('sl_token', res.access_token);
        return user
      }).then((user) => {
        return loginUser(res.access_token, user)
      }).then((data) => {
        if (data.error) {
          setErr(data.error);
          return;
        }
        setUser({ ...data, token: res.access_token });
        localStorage.setItem('sl_user', JSON.stringify(data));
      }).catch((err) => {
        console.warn('catch', err, typeof(err))
        setErr(`${err}`);
      });
    }
  });
  return (
    <button onClick={() => login()}>Login</button>
  )
};

const LogoutButton = ({ setUser }) => {
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sl_token');
    localStorage.removeItem('sl_user');
  }
  return (
    <button onClick={logout}>Logout</button>
  );
};

const Login = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [err, setErr] = React.useState();
  if (!user?.token) 
  return (
    <div>
      { err && <div className='error'>{err}</div> }
      <div className='GoogleLogin'>
        <GoogleOAuthProvider clientId={clientId}>
          { user ? <LogoutButton setUser={setUser} /> : <LoginButton setUser={setUser} setErr={setErr} /> }
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
