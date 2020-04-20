import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from "./about";
import RegisterLogin from './RegisterLogin';

function App() {
  return (
    <>
      <Switch>
        <Route path='/about' component={About}/>
        <Route path='/login' component={RegisterLogin} />
      </Switch>
    </>
  );
}

export default App;
