import React from 'react';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    // this.redirect = this.redirect.bind(this);
  }

  render() {
    return (
      <div className="trainline_row">
        <div className="trainline_routes">
          {this.props.line.name}
        </div>
        <div className="trainline_status">
          {this.props.line.status}
        </div>
        <div className="trainline_user">
        </div>
        <div className="trainline_details" onClick={this.redirect}>
          Details
        </div>
      </div>
    )
  }
}
