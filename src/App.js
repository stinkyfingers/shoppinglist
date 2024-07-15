import React from 'react';
import { ErrorContext, UserContext } from './Context';
import Find from './user/Find';
import { default as FindCollection } from './collection/Find';
import { default as ManageCollection } from './collection/Upsert';
import Header from './header/Header';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/user/find",
    element: <Find />,
  },
  {
    path: "/collection/:id",
    element: <ManageCollection>Manage Collection</ManageCollection>,
  },
  {
    path: "/collection/find",
    element: <FindCollection>Find Collection</FindCollection>,
  },
  {
    path: "/collection",
    element: <ManageCollection>Manage Collection</ManageCollection>,
  },
]);

const getUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem('sl_user'));
  const token = localStorage.getItem('sl_token');
  return { ...user, token };
}

function App() {
  const [user, setUser] = React.useState(getUserFromStorage());
  const [err, setErr] = React.useState();
  return (
    <div>
      <ErrorContext.Provider value={[ err, setErr ]}>
        <UserContext.Provider value={[ user, setUser ]}>
          <Header />
          {err && <div className='error'>{err}</div>}
          <RouterProvider router={router}>
          </RouterProvider>
        </UserContext.Provider>
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
