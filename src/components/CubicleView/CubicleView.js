import React from "react";
import { connect } from "react-redux";

import "./CubicleView.scss";

class CubicleView extends React.Component {
  render() {
    return (
      <div className="cubicle-view">
        <div className="details-ctr">
          {this.props.seatData.selectedPhase.cubicles.map(cubicle => {
            return (
              <div className="cubicle-detail-ctr" key={cubicle.id}>
                {cubicle.name}
              </div>
            );
          })}
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
