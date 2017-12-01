import React from 'react';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  render() {
    return (
      <div className="trainline-row">
        <div className="line">
          {this.props.line.route_id}
        </div>
        <div className="status">
          {this.props.line.status}
        </div>
        <button onClick={this.redirect}>
          Details
        </button>
      </div>
    )
  }
}
