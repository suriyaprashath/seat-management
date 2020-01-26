import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./Header.scss";
import seatData from "../../data/seats.json";
import * as storeActions from "../../actions/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Coimbatore"
    };
  }

  updateLocation = location => {
    this.setState({
      location
    });
    this.props.actions.updateSelectedLocation(location);
  };

  render() {
    return (
      <div className="header">
        <div className="brand">
          <img
            className="brand-logo"
            src="assets/images/soliton_logo.png"
            alt="Soliton"
          ></img>
        </div>
        <div className="route-header">Seating Management</div>
        <div className="location-ctr">
          {Object.keys(seatData).map(location => {
            return (
              <div
                className={`location ${
                  this.state.location === location ? "active" : ""
                }`}
                key={location}
                onClick={() => {
                  this.updateLocation(location);
                }}
              >
                {location}
              </div>
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
