import React from 'react';
import { listCollections } from '../api';
import { UserContext } from '../Context';

const Find = () => {
  const [collections, setCollections] = React.useState([]);
  const [user] = React.useContext(UserContext);

  React.useEffect(() => {
    if (!user?.token) return;
    listCollections(user.token)
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        setCollections(data);
      });
  }, [listCollections]);
	return (
		<div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((c) => (
            <tr key={c.id}>
              <td><a href={`/collection/${c.id}`}>{c.name}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
	);
};

export default Find;
