import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PhaseView from "./components/PhaseView/PhaseView";

export class App extends React.Component {
  render() {
    return (
      <>
        <Header></Header>
        <div className="page-body">
          <div className="sidebar-ctr">
            <Sidebar></Sidebar>
          </div>
          <div className="route-content">
            <Router>
              <Switch>
                <Route path="/" component={PhaseView} />
                <Route path="/phaseview" component={PhaseView} />
              </Switch>
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
