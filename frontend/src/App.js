import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// containers
import { Index } from './containers/Index';
import { Users } from './containers/Users';
import { Login } from './containers/Login';
import { SignUp } from './containers/SignUp';
import { UserUpdate } from './containers/UserUpdate';
import { PasswordUpdate } from './containers/PasswordUpdate';
import { UserTrainingLog } from './containers/UserTrainingLog';
import { Bookmark } from './containers/Bookmark';
import { UserQuestions } from './containers/UserQuestions';
import { UserAdvices } from './containers/UserAdvices';

// components
import { Header } from './components/Header';
import { UsersContainer } from './containers/UsersContainer';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route 
          path="/users/:userId" 
          render={({ match }) => 
            <Switch>
              <Route exact path={match.path}>
                <Users match={match} />
              </Route>
              <Route path={`${match.path}/training_logs`}>
                <UsersContainer match={match} mainComponent={<UserTrainingLog />} />
              </Route>
              <Route path={`${match.path}/bookmarks`}>
                <Bookmark />
              </Route>
              <Route path={`${match.path}/questions`}>
                <UserQuestions />
              </Route>
              <Route path={`${match.path}/advices`}>
                <UserAdvices />
              </Route>
            </Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
