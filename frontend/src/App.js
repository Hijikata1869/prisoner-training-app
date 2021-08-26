import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// containers
import { Index } from './containers/Index';
import { TrainingLogs } from './containers/TrainingLogs';
import { Users } from './containers/Users';
import { Login } from './containers/Login';
import { SignUp } from './containers/SignUp';
import { UserUpdate } from './containers/UserUpdate';
import { PasswordUpdate } from './containers/PasswordUpdate';
import { Practice } from './containers/Practice';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/training_logs">
          <TrainingLogs />
        </Route>
        <Route 
          exact 
          path="/users/:userId" 
          render={({ match }) => 
            <Users 
              match={match} 
            />
          }
        />
        <Route exact path="/sign_in">
          <Login />
        </Route>
        <Route exact path="/sign_up">
          <SignUp />
        </Route>
        <Route exaxt path="/auth/edit">
          <UserUpdate />
        </Route>
        <Route exact path="/auth/password/edit">
          <PasswordUpdate />
        </Route>
        <Route exact path="/practice">
          <Practice />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
