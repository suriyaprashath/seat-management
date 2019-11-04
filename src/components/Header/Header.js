import React from "react";
import "./Header.scss";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="brand">
          <img
            className="brand-logo"
            src="assets/images/soliton_logo.jpg"
            alt="Soliton"
          ></img>
        </div>
        <div className="route-header">Seating Management</div>
      </div>
    );
  }
}
