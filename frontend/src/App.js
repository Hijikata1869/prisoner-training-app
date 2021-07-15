import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Index } from './containers/Index';
import { TrainingLogs } from './containers/TrainingLogs';
import { Users } from './containers/Users';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/index">
          <Index />
        </Route>
        <Route exact path="/training_logs">
          <TrainingLogs />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
