import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PhaseView from "./components/PhaseView/PhaseView";
import CubicleView from "./components/CubicleView/CubicleView";
import SeatView from "./components/SeatView/SeatView";
import * as actions from "./actions/actions";
import firebase from "./firebaseSetup";
import { transformDataForApp } from "./utils/firestore.service";

export class App extends React.Component {
  constructor(props) {
    super(props);

    let firestore = firebase.firestore();
    let seatList = [];

    this.docChangeListener = null;

    firestore
      .collection("seat")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(queryDocumentSnapshot => {
          seatList.push(queryDocumentSnapshot.data());
        });
        let seatInfo = transformDataForApp(seatList);

        this.props.actions.initializeSeatData(seatInfo);

        // this.docChangeListener = firestore.collection("seat").onSnapshot(
        //   snapshot => {
        //     snapshot.docChanges().forEach(change => {
        //       if (change.type === "added") {
        //         console.log("Added", change.doc.data());
        //       }
        //     });
        //   },
        //   error => {
        //     console.error(
        //       "Error in getting documents from seat collection",
        //       error
        //     );
        //   }
        // );
      });
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.seatData).length !== 0 &&
      prevProps.seatData !== this.props.seatData
    ) {
      if (Object.keys(prevProps.seatData).length === 0) {
        this.props.actions.initializeSeatData(this.props.seatData);
      }
      this.props.actions.updateSeatData(this.props.seatData);
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
                {/* <Route path="/cubicleview" component={CubicleView} />
                <Route path="/seatview" component={SeatView} /> */}
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
