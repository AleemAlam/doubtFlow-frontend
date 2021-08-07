import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../Components/Home/Homepage';
import { Login } from '../Components/LogIn/Login';
import { Commentp } from '../Components/PrivatePage/Commentp';
import Questions from '../Components/Questions/Questions';
import SingleQuestionCard from '../Components/Questions/SingleQuestionCard';
import { RegisterMain } from '../Components/Regis/RegisterMain';
import Messenger from '../Pages/Messenger';
const Routes = () => {
  const state = useSelector((state) => state.login);

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          
          <Redirect to='/questions' />
        </Route>
        <Route path='/login'>
          {state.isAuth ? <Redirect to='/questions' /> : <Login />}
        </Route>
        <Route path='/register'>
          <RegisterMain />
        </Route>

        <Route path='/messenger'>
          <Messenger />
        </Route>
        
        <Route exact path='/questions'>
          <Questions />
        </Route>
        <Route path='/questions/:id' component={Commentp} />
      </Switch>
    </div>
  );
};

export { Routes };
