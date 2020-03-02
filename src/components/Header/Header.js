import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./Header.scss";
import * as storeActions from "../../actions/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.seatData.selectedLocation
    };
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.seatData).length !== 0 &&
      prevProps.seatData !== this.props.seatData
    ) {
      this.setState({
        location: this.props.seatData.selectedLocation
      });
    }
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
          {Object.keys(this.props.seatData.seatInfo).map(location => {
            return (
              <div
                className={`location ${
                  this.state.location === location ? "active" : ""
                } ${location.toLowerCase()}`}
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
