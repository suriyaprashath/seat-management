import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PhaseView from "./components/PhaseView/PhaseView";
import CubicleView from "./components/CubicleView/CubicleView";
import * as actions from "./actions/actions";
import seatData from "./data/seats";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.actions.initializeSeatData(seatData);
  }

  render() {
    return (
      <>
        <Router>
          <Header></Header>
          <div className="page-body">
            <div className="sidebar-ctr">
              <Sidebar></Sidebar>
            </div>
            <div className="route-content">
              <Switch>
                <Route exact path="/" component={PhaseView} />
                <Route path="/phaseview" component={PhaseView} />
                <Route path="/cubicleview" component={CubicleView} />
              </Switch>
            </div>
          </div>
        </Router>
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
