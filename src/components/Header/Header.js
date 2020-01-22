import React from "react";
import "./Header.scss";
import seatData from "../../data/seats.json";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Coimbatore"
    };
  }
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
                key="location"
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
