import React from 'react';
import { useParams } from 'react-router-dom';
import { getCollection, saveCollection } from '../api';
import { ErrorContext } from '../Context';
import { UserContext } from '../Context';
import { default as FindUser } from '../user/Find';

const defaultCollection = (user) => ({
  name: '',
  creator: user,
  users: [],
  lists: [],
});
const Upsert = () => {
  const [_, setErr] = React.useContext(ErrorContext);
  const [user] = React.useContext(UserContext);
  const [collection, setCollection] = React.useState(defaultCollection(user));
  const { id } = useParams();
  // get collection
  React.useEffect(() => {
    if (!id || !user?.token) return;
    // fetch collection by id
    getCollection(user?.token, id).then((data) => {
      if (data.error) {
        setErr(data.error);
        return;
      }
      setCollection(data);
    }).catch((err) => setErr(JSON.stringify(err)));
  }, [user, id]);
  const handleChange = (e) => {
    setCollection({ ...collection, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    saveCollection(user.token, collection).then((data) => {
      if (data.error) {
        setErr(data.error);
        return;
      }
      setCollection(data);
    }).catch((err) => setErr(JSON.stringify(err)));
  };
  const handleRemoveUser = (userToRemove) => {
    setCollection({ ...collection, users: collection.users.filter((u) => u.id !== userToRemove.id) });
  };
  const onSelectUser = (userToAdd) => {
    if (collection.users.find((u) => u.id === user.id || u.id === userToAdd.id)) {
      return;
    }
    setCollection({ ...collection, users: [...collection.users, userToAdd] });
  };
	return (
		<div>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={collection.name} onChange={handleChange}/>
      </div>
      <div>
        <label>Users</label>
        <ul>
          {collection.users.map((u) => (
            <li key={u.id} onClick={() => handleRemoveUser(u)}>{u.name}</li>)
          )}
        </ul>
      </div>
      <div>
        <label>Add User</label>
        <FindUser onSelect={onSelectUser} />
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
	);
};

export default Upsert;
