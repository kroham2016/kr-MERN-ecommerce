import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from "./About/About";
import Login from './Login/Login';
import Register from './Register/Register';

function App() {
  return (
    <>
      <Switch>
        <Route path='/about' component={About}/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </>
  );
}

export default App;
