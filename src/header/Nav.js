import React from 'react';

const Nav = () => {
	return (
		<div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/user/find">Find User</a></li>
        <li><a href="/collection/find">Find Collection of Lists</a></li>
        <li><a href="/collection/">Manage Collection of Lists</a></li>
      </ul>
    </div>
	);
};

export default Nav;
