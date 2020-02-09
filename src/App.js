import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PhaseView from "./components/PhaseView/PhaseView";
import CubicleView from "./components/CubicleView/CubicleView";
import SeatView from "./components/SeatView/SeatView";
import * as actions from "./actions/actions";

const enhance = compose(
  firestoreConnect(() => ["seat"]),
  connect(state => {
    return {
      seatData: state.firestore.data.seat || {}
    };
  })
);
export class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.actions.initializeSeatData(props.seatData);
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.seatData).length !== 0 &&
      prevProps.seatData !== this.props.seatData
    ) {
      this.props.actions.initializeSeatData(this.props.seatData);
    }
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
                <Route path="/seatview" component={SeatView} />
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

export default enhance(connect(undefined, mapDispatchToProps)(App));
