import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import PhaseView from "./components/PhaseView/PhaseView";
import CubicleView from "./components/CubicleView/CubicleView";
// import SeatView from "./components/SeatView/SeatView";
import * as actions from "./actions/actions";
import firebase from "./firebaseSetup";
import { transformDataForApp } from "./utils/firestore.service";
import { updateSeatInfo } from "./utils/seatInfo.service";

export class App extends React.Component {
  constructor(props) {
    console.log("Environment:", process.env.REACT_APP_ENV);
    super(props);

    let firestore = firebase.firestore();
    let seatList = [];
    let initialQuerySnapshot = null;
    let seatCollection = firestore.collection("seat");

    this.docChangeListener = null;

    seatCollection.get().then(querySnapshot => {
      initialQuerySnapshot = querySnapshot;
      querySnapshot.forEach(queryDocumentSnapshot => {
        seatList.push(queryDocumentSnapshot.data());
      });
      let seatInfo = transformDataForApp(seatList);

      this.props.actions.initializeSeatData(seatInfo);
    });

    this.docChangeListener = seatCollection.onSnapshot(
      snapshot => {
        if (snapshot.isEqual(initialQuerySnapshot)) {
          return;
        }
        snapshot.docChanges().forEach(change => {
          let seat = change.doc.data();
          if (change.type === "modified") {
            let seatInfo = updateSeatInfo(this.props.seatData.seatInfo, seat);
            this.props.actions.updateSeatData(seatInfo);
          }
        });
      },
      error => {
        console.error("Error in getting documents from seat collection", error);
      }
    );
  }

  componentWillUnmount() {
    // Remove listener for documents
    this.docChangeListener();
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
                {/* <Route path="/seatview" component={SeatView} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    seatData: state.seatData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
