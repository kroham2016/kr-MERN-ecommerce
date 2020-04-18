import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from "./about";

function App() {
  return (
    <>
      <Switch>
        <Route path='/about' component={About}/>
      </Switch>
    </>
  );
}

export default App;
