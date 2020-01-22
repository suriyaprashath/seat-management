import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./SeatView.scss";
import * as storeActions from "../../actions/actions";

class SeatView extends React.Component {
  unlinkOccupant = seat => {
    seat.occupied = false;
    seat.occupant = {};

    this.props.actions.updateSeat(seat);
  };

  render() {
    return (
      <div className="seat-view">
        <div className="details-ctr">
          <div className="seat-ctr">
            {this.props.seatData.selectedCubicle.seats.map(seat => {
              return (
                <div className="seat-hldr">
                  <div
                    className={`seat-name-banner ${
                      !seat.occupied ? "no-occupant" : ""
                    }`}
                  >
                    <span className="seat-name">{seat.name}</span>
                  </div>
                  <div className="seat-details">
                    <div className="occupant-info">
                      {seat.occupied ? (
                        <>
                          <div className="occupant-utils">
                            <div className="photo-hldr"></div>
                          </div>
                          <div className="occupant-name">
                            {seat.occupant.name}
                          </div>
                        </>
                      ) : (
                        <div className="add-occupant">
                          <img
                            className="add-icon"
                            src="./assets/images/pencil.png"
                            alt="Add"
                          />
                          <span className="add-txt">Add Person</span>
                        </div>
                      )}
                    </div>
                    <div className="assets-ctr">
                      <div className="asset icon-asset">
                        <img
                          className="asset-icon"
                          src="./assets/images/pencil.png"
                          alt="Add"
                        />
                        <span className="asset-info">{seat.assets.cpu}</span>
                      </div>
                      <div className="asset icon-asset">
                        <img
                          className="asset-icon"
                          src="./assets/images/pencil.png"
                          alt="Add"
                        />
                        <span className="asset-info">
                          {seat.assets.monitor}
                        </span>
                      </div>
                      <div className="asset label-asset">
                        <label className="asset-name">LAN PORT NUMBER</label>
                        <div className="asset-info">{seat.assets.lan}</div>
                      </div>
                      <div className="asset label-asset">
                        <label className="asset-name">LANDLINE NO</label>
                        <div className="asset-info">{seat.assets.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(SeatView);
