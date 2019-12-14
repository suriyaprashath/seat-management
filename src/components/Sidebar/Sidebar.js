import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feature: "Seats"
    };
  }

  render() {
    return (
      <div className="sidebar">
        <ul className="feature-list">
          <li className="feature">
            <Router>
              <Link
                className={`link ${
                  this.state.feature === "Seats" ? "active" : ""
                }`}
                to="/phaseview"
              >
                Seats
              </Link>
            </Router>
          </li>
        </ul>
      </div>
    );
  }
}
