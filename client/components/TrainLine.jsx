import React from 'react';
import Nav from './Nav.jsx';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrain: []
    }
    this.showNav = this.showNav.bind(this)
  }

  showNav(e) {
    this.props.showCurrentRoute(this.props.info, this.props.line)
  }

  render() {
    return (
      <div>
          <div className="trainline_row">
            <div className="trainline_routes">
              {this.props.line.name || this.props.line.route_id}
            </div>
            <div className="trainline_status">
              {this.props.line.status}
            </div>
            <div className="trainline_user">
            </div>
            <button onClick={this.showNav}>
              Details
            </button>
          </div>
      </div>
    )
  }
}
