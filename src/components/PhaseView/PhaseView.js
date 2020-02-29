import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router";

import "./PhaseView.scss";
import "../Breadcrumb/Breadcrumb";
import * as utils from "../../utils/utils";
import * as storeActions from "../../actions/actions";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

class PhaseView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routeToCubicleView: false,
      breadCrumbConfig: [
        {
          display: this.props.seatData.selectedLocation
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.seatData.selectedLocation !==
      this.props.seatData.selectedLocation
    ) {
      this.setState({
        breadCrumbConfig: [
          {
            display: this.props.seatData.selectedLocation
          }
        ]
      });
    }
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
          <Breadcrumb configList={this.state.breadCrumbConfig}></Breadcrumb>
          <div className="stats-ctr">
            <div className="total-seat stat">
              <img
                className="stat-icon"
                src="/assets/images/total-seats.svg"
                alt="Total Seats"
              />
              <p className="desc">Total Seats</p>
              <p className="value">
                {utils.getTotalSeatsInALocation(
                  this.props.seatData.seatInfo,
                  this.props.seatData.selectedLocation
                )}
              </p>
            </div>
            <div className="occupied-seat stat">
              <img
                className="stat-icon"
                src="/assets/images/occupied-seats.svg"
                alt="Occupied Seats"
              />
              <p className="desc">Occupied Seats</p>
              <p className="value">
                {utils.getOccupiedSeatsInALocation(
                  this.props.seatData.seatInfo,
                  this.props.seatData.selectedLocation
                )}
              </p>
            </div>
            <div className="available-seat stat">
              <img
                className="stat-icon"
                src="/assets/images/available-seats.svg"
                alt="Available Seats"
              />
              <p className="desc">Available Seats</p>
              <p className="value">
                {utils.getAvailableSeatsInALocation(
                  this.props.seatData.seatInfo,
                  this.props.seatData.selectedLocation
                )}
              </p>
            </div>
          </div>
          {this.props.seatData.selectedLocation !== "" &&
            this.props.seatData.seatInfo[
              this.props.seatData.selectedLocation
            ].phases.map(phase => {
              return (
                <div
                  className="phase-detail-ctr"
                  key={phase.id}
                  onClick={() => {
                    this.setSelectedPhase(phase);
                    this.routeToCubicleView();
                  }}
                >
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
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="visual-ctr">
          <div className="map-ctr">
            <img
              className="map"
              alt="Map"
              src={`/assets/images/${this.props.seatData.seatInfo[
                this.props.seatData.selectedLocation
              ] &&
                this.props.seatData.seatInfo[
                  this.props.seatData.selectedLocation
                ].id}-map.svg`}
            />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhaseView);
