import React from "react";
import { connect } from "react-redux";

import "./CubicleView.scss";

class CubicleView extends React.Component {
  render() {
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
                        <div className="view-ctr">
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
                                  {seat.occupant && seat.occupant.name
                                    ? seat.occupant.name
                                    : "-"}
                                </span>
                                <img
                                  className="edit-occupant"
                                  src="./assets/images/pencil.png"
                                  alt="Edit"
                                />
                              </div>
                              <span className="team"></span>
                              <div className="unlink">
                                <img
                                  className="unlink-icon"
                                  src="./assets/images/unlink.png"
                                  alt="Unlink"
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

export default connect(mapStateToProps)(CubicleView);
