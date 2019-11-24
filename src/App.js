import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PhaseView from './components/PhaseView/PhaseView';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <PhaseView></PhaseView>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
