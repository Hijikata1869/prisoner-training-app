import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// containers
import { Index } from "./containers/Index";
import { Users } from "./containers/Users";
import { Login } from "./containers/Login";
import { SignUp } from "./containers/SignUp";
import { UserUpdate } from "./containers/UserUpdate";
import { PasswordUpdate } from "./containers/PasswordUpdate";
import { UserTrainingLog } from "./containers/UserTrainingLog";
import { UserBookmarks } from "./containers/UserBookmarks";
import { UserQuestions } from "./containers/UserQuestions";
import { UserAdvices } from "./containers/UserAdvices";
import { Questions } from "./containers/Questions";
import { Advices } from "./containers/Advices";
import { Contact } from "./containers/Contact";
import { UserFollowings } from "./containers/UserFollowings";
import { UserFollowers } from "./containers/UserFollowers";
import { TrainingLogs } from "./containers/TrainingLogs";
import { Page404 } from "./containers/Page404";
import { UserBodyComposition } from "./containers/UserBodyComposition";
import { OneKindQuestions } from "./containers/OneKindQuestions";

// components
import { Header } from "./components/Header";
import { UsersContainer } from "./containers/UsersContainer";

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
          render={({ match }) => (
            <Switch>
              <Route exact path={`${match.path}/training_logs`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserTrainingLog match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}/bookmarks`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserBookmarks match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}`}>
                <UsersContainer
                  match={match}
                  mainComponent={<Users match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}/questions`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserQuestions match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}/advices`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserAdvices match={match} />}
                />
              </Route>
              <Route exaxt path={`${match.path}/auth/edit`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserUpdate match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}/followings`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserFollowings match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}/followers`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserFollowers match={match} />}
                />
              </Route>
              <Route exact path={`${match.path}/body_compositions`}>
                <UsersContainer
                  match={match}
                  mainComponent={<UserBodyComposition match={match} />}
                />
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          )}
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
        <Route
          path="/questions"
          render={({ match }) => (
            <Switch>
              <Route exact path={`${match.path}`}>
                <Questions />
              </Route>
              <Route exact path={`${match.path}/push_up`}>
                <OneKindQuestions />
              </Route>
              <Route exact path={`${match.path}/squat`}>
                <OneKindQuestions />
              </Route>
              <Route exact path={`${match.path}/pull_up`}>
                <OneKindQuestions />
              </Route>
              <Route exact path={`${match.path}/leg_raise`}>
                <OneKindQuestions />
              </Route>
              <Route exact path={`${match.path}/bridge`}>
                <OneKindQuestions />
              </Route>
              <Route exact path={`${match.path}/handstand_push_up`}>
                <OneKindQuestions />
              </Route>
              <Route
                path="/questions/:questionId"
                render={({ match }) => (
                  <Switch>
                    <Route exact path={`${match.path}/advices`}>
                      <Advices match={match} />
                    </Route>
                    <Route path="*">
                      <Page404 />
                    </Route>
                  </Switch>
                )}
              />
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          )}
        />
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/training_logs">
          <TrainingLogs />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
