import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Redirect } from "react-router";
import { firestoreConnect } from "react-redux-firebase";

import "./CubicleView.scss";
import * as storeActions from "../../actions/actions";
import ModifyOccupant from "../ModifyOccupant/ModifyOccupant";
import AddOccupant from "../AddOccupant/AddOccupant";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import * as utils from "../../utils/utils";
import * as firestoreService from "../../utils/firestore.service";

const enhance = compose(
  firestoreConnect(() => ["people"]), // or { collection: 'people' }
  connect(state => {
    return {
      people: state.firestore.data.people
    };
  })
);

class CubicleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breadCrumbConfig: [
        {
          display: this.props.seatData.selectedLocation,
          url: "/phaseview"
        },
        {
          display: this.props.seatData.selectedPhase.name
        }
      ],
      doAddOccupant: false, // Right panel
      doEditOccupant: false, // Right panel
      routeToSeatView: false,
      seatToEdit: null,
      showRightPanel: false
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
            display: this.props.seatData.selectedLocation,
            url: "/phaseview"
          },
          {
            display: this.props.seatData.selectedPhase.name
          }
        ]
      });
    }
  }

  addOccupant = seat => {
    this.setState({
      seatToEdit: seat,
      doAddOccupant: true,
      doEditOccupant: false,
      showRightPanel: true
    });
  };

  closeAddOccupant = () => {
    this.setState({
      doAddOccupant: false,
      showRightPanel: false
    });
  };

  cancelEditOccupant = () => {
    this.setState({
      doEditOccupant: false,
      showRightPanel: false
    });
  };

  editOccupant = seat => {
    this.setState({
      seatToEdit: seat,
      doAddOccupant: false,
      doEditOccupant: true,
      showRightPanel: true
    });
  };

  routeToSeatView = () => {
    this.setState({
      routeToSeatView: true
    });
  };

  setSelectedCubicle = cubicle => {
    this.props.actions.updateSelectedCubicle(cubicle);
  };

  unlinkOccupant = seat => {
    seat.occupied = false;
    seat.occupant = {};

    firestoreService.updateSeat(seat);
  };

  render() {
    if (this.state.routeToSeatView) {
      return <Redirect to="/seatview" />;
    }
    return (
      <div className="cubicle-view">
        {/* Right Panel */}
        <div className="right-panel" hidden={!this.state.showRightPanel}>
          {this.state.doAddOccupant && (
            <AddOccupant
              seatToAdd={this.state.seatToEdit}
              closeAdd={this.closeAddOccupant}
              people={this.props.people}
            ></AddOccupant>
          )}
          {this.state.doEditOccupant && (
            <ModifyOccupant
              seatToEdit={this.state.seatToEdit}
              cancelEdit={this.cancelEditOccupant}
            ></ModifyOccupant>
          )}
        </div>

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
                {utils.getTotalSeatsInAPhase(this.props.seatData.selectedPhase)}
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
                {utils.getOccupiedSeatsInAPhase(
                  this.props.seatData.selectedPhase
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
                {utils.getAvailableSeatsInAPhase(
                  this.props.seatData.selectedPhase
                )}
              </p>
            </div>
          </div>
          <div className="cubicle-detail-ctr">
            <div className="tbl-hdr cubicle-detail-hdr">
              <span className="cubicle">Cubicle</span>
              <span className="seat">Seat</span>
              <span className="name">Name</span>
              <span className="team">Team</span>
              <span className="unlink">Unlink</span>
            </div>
            <div className="cubicle-detail-bdy">
              {Object.keys(this.props.seatData.selectedPhase).length !== 0 &&
                this.props.seatData.selectedPhase.cubicles
                  .sort((a, b) => {
                    /*
                     Strip the cubicle data from the id and extract the numbers
                     in it. The array is sorted in ascending order based on the
                     extracted numbers.

                     Example:
                      B-3F-C3   =>  C3  =>  3
                      B-3F-C30  =>  C30 =>  30
                    */
                    let aid = parseInt(
                      a.id.split("-")[2].replace(/[^0-9]/g, "")
                    );
                    let bid = parseInt(
                      b.id.split("-")[2].replace(/[^0-9]/g, "")
                    );
                    return aid - bid;
                  })
                  .map((cubicle, cubicleIndex) => {
                    return (
                      <div
                        className={`cubicle-detail ${
                          cubicleIndex % 2 === 0 ? "odd-row" : "even-row"
                        }`}
                        key={cubicle.id}
                      >
                        <div className="cubicle">
                          <span className="cubicle-name">{cubicle.name}</span>
                          <div
                            className="view-ctr disabled"
                            onClick={() => {
                              return;
                              this.setSelectedCubicle(cubicle);
                              this.routeToSeatView();
                            }}
                          >
                            View
                            <img
                              className="view-icon"
                              src="./assets/images/view-right.svg"
                              alt="Go"
                            />
                          </div>
                        </div>
                        <div
                          className={`seat-details-ctr ${
                            cubicle.seats.length <= 1 ? "less-seat" : ""
                          }`}
                        >
                          {cubicle.seats.map((seat, seatIndex) => {
                            return (
                              <div
                                className={`seat-detail ${
                                  seatIndex % 2 === 0 ? "odd-row" : "even-row"
                                }`}
                                key={seat.id}
                              >
                                <span className="seat">{seat.name}</span>
                                <div className="name">
                                  <span>
                                    {seat.occupied
                                      ? utils.getFullNameFromObj(seat.occupant)
                                      : "-"}
                                  </span>
                                  {seat.occupied ? (
                                    <img
                                      className="action-icon edit-occupant-action"
                                      src="./assets/images/pencil.png"
                                      alt="Edit"
                                      onClick={() => {
                                        this.editOccupant(seat);
                                      }}
                                    />
                                  ) : (
                                    <img
                                      className="action-icon add-occupant-action"
                                      src="./assets/images/add.svg"
                                      alt="Add"
                                      onClick={() => {
                                        this.addOccupant(seat);
                                      }}
                                    />
                                  )}
                                </div>
                                <span className="team">
                                  {seat.occupant.team &&
                                  seat.occupant.team !== ""
                                    ? seat.occupant.team
                                    : "-"}
                                </span>
                                <div className="unlink">
                                  <img
                                    className={`unlink-icon ${
                                      !seat.occupied ? "disabled" : ""
                                    }`}
                                    src="./assets/images/unlink.png"
                                    alt="Unlink"
                                    onClick={() => {
                                      if (seat.occupied) {
                                        this.unlinkOccupant(seat);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
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

export default enhance(
  connect(mapStateToProps, mapDispatchToProps)(CubicleView)
);
