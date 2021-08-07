import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../Components/Home/Homepage';
import { Login } from '../Components/LogIn/Login';
import { RegisterMain } from '../Components/Regis/RegisterMain';
import Messenger from '../Pages/Messenger';
const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <RegisterMain />
        </Route>
        <Route path='/messenger'>
          <Messenger />
        </Route>
      </Switch>
    </div>
  );
};

export { Routes };
