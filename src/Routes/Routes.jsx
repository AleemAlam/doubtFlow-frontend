import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from '../Components/Home/Homepage';
import { Login } from '../Components/LogIn/Login';
import { RegisterMain } from '../Components/Regis/RegisterMain';

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
      </Switch>
    </div>
  );
};

export { Routes };
