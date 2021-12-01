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
import { UserBookmarks } from './containers/UserBookmarks';
import { UserQuestions } from './containers/UserQuestions';
import { UserAdvices } from './containers/UserAdvices';
import { Questions } from './containers/Questions';
import { Advices } from './containers/Advices';
import { Contact } from './containers/Contact';
import { UserFollowings } from './containers/UserFollowings';
import { UserFollowers } from './containers/UserFollowers';
import { TrainingLogs } from './containers/TrainingLogs';

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
              <Route exact path={`${match.path}/training_logs`}>
                <UsersContainer match={match} mainComponent={<UserTrainingLog match={match} />} />
              </Route>
              <Route exact path={`${match.path}/bookmarks`}>
                <UsersContainer match={match} mainComponent={<UserBookmarks match={match} />} />
              </Route>
              <Route exact path={`${match.path}`}>
                <UsersContainer match={match} mainComponent={<Users match={match} />} />
              </Route>
              <Route exact path={`${match.path}/questions`}>
                <UsersContainer match={match} mainComponent={<UserQuestions match={match} />} />
              </Route>
              <Route exact path={`${match.path}/advices`}>
                <UsersContainer match={match} mainComponent={<UserAdvices match={match} />} />
              </Route>
              <Route exaxt path={`${match.path}/auth/edit`}>
                <UsersContainer match={match} mainComponent={<UserUpdate match={match} />} />
              </Route>
              <Route exact path={`${match.path}/followings`}>
                <UsersContainer match={match} mainComponent={<UserFollowings match={match} />} />
              </Route>
              <Route exact path={`${match.path}/followers`}>
                <UsersContainer match={match} mainComponent={<UserFollowers match={match} />} />
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
        <Route exact path="/auth/password/edit">
          <PasswordUpdate />
        </Route>
        <Route exact path="/questions">
          <Questions />
        </Route>
        <Route 
          path="/questions/:questionId" 
          render={({ match }) => 
            <Switch>
              <Route exact path={`${match.path}/advices`} >
                <Advices match={match} />
              </Route>
            </Switch>
          }
        />
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/training_logs">
          <TrainingLogs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
