import React from 'react';
import { listUsers } from '../api';
import { UserContext, ErrorContext } from '../Context';

const Find = ({ onSelect }) => {
  const [user] = React.useContext(UserContext);
  const [_, setErr] = React.useContext(ErrorContext);
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState(users);
  React.useEffect(() => {
    if (!user?.token) return;
    listUsers(user.token).then((data) => {
      if (data.error) {
        setErr(data.error);
        return;
      }
      setUsers(data);
    });
  }, [user]);
  
  const handleSearch = (e) => {
    setFilteredUsers(users.filter((u) => u.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }
  
	return (
		<div>
      <h1>Find Users</h1>
      <input type='text' onChange={handleSearch} />
      <ul>
        {filteredUsers.map((u) => (
          <li key={u.id} onClick={() => onSelect(u)}>{u.name}</li>)
        )}
      </ul>
    </div>
	);
};

export default Find;
