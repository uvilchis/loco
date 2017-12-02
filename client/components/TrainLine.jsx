import React from 'react';
import Details from './Details';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route_id: ''
    }
    this.redirect = this.redirect.bind(this);
  }

  redirect () {
    this.props.setAppState('details')
  }

  render() {
    if (this.state)
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
        <button onClick={this.redirect} >
          Details
        </button>
      </div>
    )
  }
}
