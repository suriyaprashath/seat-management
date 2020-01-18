import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect, withRouter } from "react-router";

import "./PhaseView.scss";
import * as utils from "../../utils";
import * as storeActions from "../../actions/actions";

class PhaseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routeToCubicleView: false
    };
  }

  routeToCubicleView = () => {
    this.setState({
      routeToCubicleView: true
    });
  };

  setSelectedPhase = phase => {
    this.props.actions.updateSelectedPhase(phase);
  };

  render() {
    if (this.state.routeToCubicleView) {
      return <Redirect to="/cubicleview" />;
    }
    return (
      <div className="phase-view">
        <div className="details-ctr">
          {this.props.seatData.seatInfo[
            this.props.seatData.selectedLocation
          ].phases.map(phase => {
            return (
              <div className="phase-detail-ctr" key={phase.id}>
                <span className="phase-name">{phase.name}</span>
                <div className="phase-stats-ctr">
                  <div className="phase-stat total-seats">
                    TOTAL SEATS :
                    <span className="count-stat total-seat-count">
                      {utils.getTotalSeatsInAPhase(phase)}
                    </span>
                  </div>
                  <div className="phase-stat available-seats">
                    AVAILABLE SEATS :
                    <span className="count-stat available-seat-count">
                      {utils.getAvailableSeatsInAPhase(phase)}
                    </span>
                  </div>
                </div>
                <div className="route-btn">
                  <img
                    src="./assets/images/arrow-right.png"
                    alt="Show Phase Details"
                    onClick={() => {
                      this.setSelectedPhase(phase);
                      this.routeToCubicleView();
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="visual-ctr"></div>
      </div>
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
    actions: bindActionCreators(storeActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PhaseView));
