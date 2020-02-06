import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./AddOccupant.scss";
import * as storeActions from "../../actions/actions";
import { getSeatPath } from "../../utils/seatInfo.service";
import { getFullNameFromObj } from "../../utils/utils";

class AddOccupant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      occupantToAdd: null
    };
  }

  addOccupantToSeat = (seat, occupant) => {
    seat.occupied = true;
    seat.occupant = {
      ...occupant
    };

    this.props.actions.updateSeat(seat);
  };

  updateSearchText = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  updateOccupantToAdd = occupant => {
    this.setState({
      occupantToAdd: occupant
    });
  };

  render() {
    return (
      <div className="add-occupant">
        <div className="add-occupant-header">
          <div className="header-info">
            <p className="seat-path">
              {getSeatPath(this.props.seatData.seatInfo, this.props.seatToAdd)}
            </p>
            <p className="info-txt">Add User to Seat</p>
          </div>
          <img
            className="close-panel-icon"
            src="/assets/images/close-dark.svg"
            alt="close"
          />
        </div>
        <div className="search-ctr">
          <div className="search-box">
            <img
              className="search-icon"
              src="/assets/images/search.svg"
              alt="Search"
            />
            <input
              className="search text-box dark"
              type="text"
              placeholder="Search Here"
              value={this.state.searchText}
              onChange={this.updateSearchText}
            />
          </div>
        </div>
        <div className="occupant-list-ctr">
          <div className="occupant-list-hdr">
            <p className="select-occupant"></p>
            <p className="name">Name</p>
            <p className="team">Team</p>
          </div>
          <div className="occupant-list-bdy">
            {Object.keys(this.props.people).map((peopleId, peopleIndex) => {
              let people = this.props.people[peopleId];
              return (
                <div
                  className={`occupant-list ${
                    peopleIndex % 2 === 0 ? "odd-row" : "even-row"
                  }`}
                  key={peopleId}
                >
                  <div className="select-occupant">
                    <input
                      className="radio square input"
                      type="radio"
                      name="select-seat"
                      id={`select-${peopleId}`}
                      onChange={() => {
                        this.updateOccupantToAdd(people);
                      }}
                    />
                    <label
                      className="radio square label"
                      htmlFor={`select-${peopleId}`}
                    />
                  </div>
                  <div className="name">{getFullNameFromObj(people)}</div>
                  <div className="team">{people.team}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="actions-ctr">
          <button className="btn danger" onClick={this.props.closeAdd}>
            Cancel
          </button>
          <button
            className="btn success"
            onClick={() => {
              this.addOccupantToSeat(
                this.props.seatToAdd,
                this.state.occupantToAdd
              );
              this.props.closeAdd();
            }}
            disabled={!this.state.occupantToAdd}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddOccupant);
