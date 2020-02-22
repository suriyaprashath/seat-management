import React from "react";
import { Redirect } from "react-router";

import "./Breadcrumb.scss";

export default class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: ""
    };
  }

  updateRedirectUrl = redirectUrl => {
    this.setState({
      redirectUrl
    });
  };

  render() {
    if (this.state.redirectUrl) {
      return <Redirect push to={this.state.redirectUrl} />;
    }
    return (
      <div
        className={`breadcrumb-ctr ${
          this.props.configList.length <= 1 ? "first-page" : ""
        }`}
      >
        <div className="breadcrumb-list">
          {this.props.configList.map((config, configIndex, configList) => {
            return (
              <React.Fragment key={config.url || config.display || configIndex}>
                {configIndex < configList.length - 1 && (
                  <>
                    <p
                      className="breadcrumb"
                      onClick={() => {
                        if (config.url) {
                          this.updateRedirectUrl(config.url);
                        }
                      }}
                    >
                      {config.display}
                    </p>
                    {configIndex < configList.length - 2 && (
                      <span className="right-arrow">
                        <img
                          src="/assets/images/chevron-right.png"
                          alt="right-arrow"
                        />
                      </span>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="current-page">
          <p className="title">
            {this.props.configList[this.props.configList.length - 1].display}
          </p>
        </div>
      </div>
    );
  }
}
