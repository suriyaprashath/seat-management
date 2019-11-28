import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PhaseView from "./components/PhaseView/PhaseView";
import * as actions from "./actions/actions";
import seatData from './data/seats';

export class App extends React.Component {
  componentDidMount() {
    this.props.actions.initializeSeatData(seatData);
  }

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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(undefined, mapDispatchToProps)(App);
