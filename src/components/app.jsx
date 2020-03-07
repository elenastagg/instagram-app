import React, { Fragment } from 'react';
import LogIn from './login';
import Register from './register';

const App = () => (
  <Fragment key="key">
    <h1>Log In</h1>
    <LogIn />
    <Register />
  </Fragment>
);

export default App;
