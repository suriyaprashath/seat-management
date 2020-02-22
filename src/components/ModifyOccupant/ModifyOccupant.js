import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./ModifyOccupant.scss";
import * as storeActions from "../../actions/actions";
import { getFullNameFromObj } from "../../utils/utils";
import { getDetailsForSeat } from "../../utils/seatInfo.service";
import * as firestoreService from "../../utils/firestore.service";

class ModifyOccupant extends React.Component {
  constructor(props) {
    super(props);

    let [location, phase] = this.getSelectedLocationAndPhase(
      this.props.seatData.seatInfo,
      this.props.seatToEdit
    );

    this.state = {
      modifyOccupant: {
        selectedLocation: location,
        selectedPhase: phase
      },
      modifyOption: "move",
      targetSeatToModify: null
    };
  }

  componentDidUpdate(prevProps) {
    // Update the hierarchy fields automatically only if the seat to edit is changed
    if (prevProps.seatToEdit !== this.props.seatToEdit) {
      let [location, phase] = this.getSelectedLocationAndPhase(
        this.props.seatData.seatInfo,
        this.props.seatToEdit
      );
      let modifyOccupant = this.state.modifyOccupant;

      if (
        location !== modifyOccupant.selectedLocation ||
        phase !== modifyOccupant.selectedPhase
      ) {
        this.setState({
          modifyOccupant: {
            ...modifyOccupant,
            selectedLocation: location,
            selectedPhase: phase
          }
        });
      }
    }
  }

  /**
   * Returns the location and phase of a particular seat
   * @param  {object} seatInfo - total seat data
   * @param  {object} seat - a seat whose location and phase need to be derived
   */
  getSelectedLocationAndPhase = (seatInfo, seat) => {
    let [location, phaseIndex] = getDetailsForSeat(seatInfo, seat);
    let phase = this.props.seatData.seatInfo[location].phases[phaseIndex];

    return [location, phase];
  };

  /**
   * Update Modify Section Location and reset the Phase on changing the location
   */
  onTargetLocationChange = event => {
    let selectedLocation = event.target.value;
    let phaseId = this.props.seatData.seatInfo[selectedLocation].phases[0].id;

    this.updateModifyLocation(selectedLocation);
    this.updateModifyPhase(phaseId, selectedLocation);
  };

  onTargetPhaseChange = event => {
    let phaseId = event.target.value;
    this.updateModifyPhase(phaseId, this.state.modifyOccupant.selectedLocation);
  };

  onModifyOptionChange = event => {
    let modifyOption = event.target.value;

    this.setState({
      modifyOption
    });
  };

  performModify = (modifyOption, seatToEdit, targetSeat) => {
    let tempSeat = {};

    switch (modifyOption) {
      case "move":
        if (seatToEdit === targetSeat) {
          return;
        }
        targetSeat.occupied = seatToEdit.occupied;
        targetSeat.occupant = {
          ...seatToEdit.occupant
        };
        seatToEdit.occupied = false;
        seatToEdit.occupant = {};

        firestoreService.updateSeat(seatToEdit).then(() => {
          firestoreService.updateSeat(targetSeat);
        });
        break;

      case "exchange":
        if (seatToEdit === targetSeat) {
          return;
        }
        tempSeat.occupied = seatToEdit.occupied;
        tempSeat.occupant = {
          ...seatToEdit.occupant
        };

        seatToEdit.occupied = targetSeat.occupied;
        seatToEdit.occupant = targetSeat.occupant;

        targetSeat.occupied = tempSeat.occupied;
        targetSeat.occupant = tempSeat.occupant;

        firestoreService.updateSeat(seatToEdit).then(() => {
          firestoreService.updateSeat(targetSeat);
        });
        break;

      case "unlink":
        seatToEdit.occupied = false;
        seatToEdit.occupant = {};

        firestoreService.updateSeat(seatToEdit);
        break;

      default:
        console.warn("Choose a proper modify option");
    }
  };

  /**
   * Remove occupant from a seat
   * @param  {object} seat - seat object
   */
  unlinkOccupant = seat => {
    seat.occupied = false;
    seat.occupant = {};

    firestoreService.updateSeat(seat);
  };

  /**
   * Set the target seat location
   */
  updateModifyLocation = selectedLocation => {
    this.setState(prevState => {
      return {
        modifyOccupant: {
          ...prevState.modifyOccupant,
          selectedLocation
        }
      };
    });
  };

  /**
   * Set the target seat phase
   */
  updateModifyPhase = (phaseId, selectedLocation) => {
    let selectedPhase = this.props.seatData.seatInfo[
      selectedLocation
    ].phases.find(phase => {
      return phase.id === phaseId;
    });

    this.setState(prevState => {
      return {
        modifyOccupant: {
          ...prevState.modifyOccupant,
          selectedPhase
        }
      };
    });
  };

  updateTargetSeatToModify = seat => {
    this.setState({
      targetSeatToModify: seat
    });
  };

  render() {
    return (
      <div className="modify-occupant">
        <div className="occupant-info-ctr">
          <span className="occupant-photo"></span>
          <span className="occupant-name">
            {getFullNameFromObj(this.props.seatToEdit.occupant)}
          </span>
          <img
            className="close-panel-icon"
            src="/assets/images/close-dark.svg"
            alt="close"
            onClick={this.props.cancelEdit}
          />
        </div>
        <div className="modify-options-ctr">
          <div className="move-to">
            <input
              className="radio circle input"
              type="radio"
              name="modify"
              id="move-to"
              value="move"
              onChange={this.onModifyOptionChange}
              checked={this.state.modifyOption === "move"}
            />
            <label className="radio circle label" htmlFor="move-to" />
            <label className="radio circle value">Move To</label>
          </div>
          <div className="exchange">
            <input
              className="radio circle input"
              type="radio"
              name="modify"
              id="exchange"
              value="exchange"
              onChange={this.onModifyOptionChange}
              checked={this.state.modifyOption === "exchange"}
            />
            <label className="radio circle label" htmlFor="exchange" />
            <label className="radio circle value">Exchange Seats</label>
          </div>
          <div className="unlink">
            <input
              className="radio circle input"
              type="radio"
              name="modify"
              id="unlink"
              value="unlink"
              onChange={this.onModifyOptionChange}
              checked={this.state.modifyOption === "unlink"}
            />
            <label className="radio circle label" htmlFor="unlink" />
            <label className="radio circle value">Unlink</label>
          </div>
        </div>
        <div className="hierarchy-ctr">
          <select
            className="select location-select"
            value={this.state.modifyOccupant.selectedLocation}
            onChange={this.onTargetLocationChange}
          >
            {Object.keys(this.props.seatData.seatInfo).map(location => {
              return (
                <option value={location} key={location}>
                  {location}
                </option>
              );
            })}
          </select>

          <select
            className="select phase-select"
            value={this.state.modifyOccupant.selectedPhase.id}
            onChange={this.onTargetPhaseChange}
          >
            {this.props.seatData.seatInfo[
              this.state.modifyOccupant.selectedLocation
            ].phases.map(phase => {
              return (
                <option value={phase.id} key={phase.id}>
                  {phase.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mo-detail-ctr">
          <div className="tbl-hdr mo-detail-hdr">
            <p className="select-seat"></p>
            <p className="cubicle">Cubicle</p>
            <p className="seat">Seat</p>
            <p className="name">Name</p>
            <p className="team">Team</p>
          </div>
          <div className="mo-detail-bdy">
            {this.state.modifyOccupant.selectedPhase.cubicles.map(
              (cubicle, cubicleIndex) => {
                return (
                  <div
                    className={`mo-detail ${
                      cubicleIndex % 2 === 0 ? "odd-row" : "even-row"
                    }`}
                    key={cubicle.id}
                  >
                    <div
                      className={`select-seat-ctr ${
                        cubicle.seats.length <= 1 ? "less-seat" : ""
                      }`}
                    >
                      {cubicle.seats.map((seat, seatIndex) => {
                        return (
                          <div
                            className={`select-seat ${
                              seatIndex % 2 === 0 ? "odd-row" : "even-row"
                            }`}
                            key={seat.id}
                          >
                            <input
                              className="radio square input"
                              type="radio"
                              name="select-seat"
                              id={`select-${seat.id}`}
                              onChange={() => {
                                this.updateTargetSeatToModify(seat);
                              }}
                            />
                            <label
                              className="radio square label"
                              htmlFor={`select-${seat.id}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="cubicle">
                      <span className="cubicle-name">{cubicle.name}</span>
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
                                {seat.occupant && seat.occupant.firstName
                                  ? getFullNameFromObj(seat.occupant)
                                  : "-"}
                              </span>
                            </div>
                            <span className="team">
                              {seat.occupant.team && seat.occupant.team !== ""
                                ? seat.occupant.team
                                : "-"}
                            </span>
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
        <div className="actions-ctr">
          <button
            className="btn success"
            onClick={() => {
              this.performModify(
                this.state.modifyOption,
                this.props.seatToEdit,
                this.state.targetSeatToModify
              );
              this.props.cancelEdit();
            }}
            disabled={
              !this.state.targetSeatToModify &&
              this.state.modifyOption !== "unlink"
            }
          >
            Confirm
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOccupant);
