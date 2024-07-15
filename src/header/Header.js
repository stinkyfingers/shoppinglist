import React from 'react';
import Login from '../user/Login';
import Nav from './Nav';
import { UserContext } from '../Context';

const Header = () => {
  const [user] = React.useContext(UserContext);
	return (
		<div>
      { user && <div>Welcome, {user.name}</div> }
      <Login />
      <Nav />
    </div>
	);
};

export default Header;
