import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Redirect } from "react-router";
import { firestoreConnect } from "react-redux-firebase";

import "./CubicleView.scss";
import * as storeActions from "../../actions/actions";
import ModifyOccupant from "../ModifyOccupant/ModifyOccupant";

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
      seatToEdit: null,
      doEditOccupant: false,
      routeToSeatView: false
    };
  }

  cancelEditOccupant = () => {
    this.setState({
      doEditOccupant: false
    });
  };

  editOccupant = seat => {
    this.setState({
      seatToEdit: seat,
      doEditOccupant: true
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

    this.props.actions.updateSeat(seat);
  };

  render() {
    if (this.state.routeToSeatView) {
      return <Redirect to="/seatview" />;
    }
    return (
      <div className="cubicle-view">
        <div className="details-ctr">
          <div className="cubicle-detail-ctr">
            <div className="tbl-hdr cubicle-detail-hdr">
              <span className="cubicle">Cubicle</span>
              <span className="seat">Seat</span>
              <span className="name">Name</span>
              <span className="team">Team</span>
              <span className="unlink">Unlink</span>
            </div>
            <div className="cubicle-detail-bdy">
              {this.props.seatData.selectedPhase.cubicles.map(
                (cubicle, cubicleIndex) => {
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
                          className="view-ctr"
                          onClick={() => {
                            this.setSelectedCubicle(cubicle);
                            this.routeToSeatView();
                          }}
                        >
                          View
                          <img
                            className="view-icon"
                            src="./assets/images/pencil.png"
                            alt="Go"
                          />
                        </div>
                      </div>
                      <div className="seat-details-ctr">
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
                                    ? seat.occupant.name
                                    : "-"}
                                </span>
                                <img
                                  className="edit-occupant"
                                  src="./assets/images/pencil.png"
                                  alt="Edit"
                                  onClick={() => {
                                    this.editOccupant(seat);
                                  }}
                                />
                              </div>
                              <span className="team"></span>
                              <div className="unlink">
                                <img
                                  className="unlink-icon"
                                  src="./assets/images/unlink.png"
                                  alt="Unlink"
                                  onClick={() => {
                                    this.unlinkOccupant(seat);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="visual-ctr">
          {this.state.doEditOccupant && (
            <ModifyOccupant
              seatToEdit={this.state.seatToEdit}
              cancelEdit={this.cancelEditOccupant}
            ></ModifyOccupant>
          )}
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

export default enhance(
  connect(mapStateToProps, mapDispatchToProps)(CubicleView)
);
