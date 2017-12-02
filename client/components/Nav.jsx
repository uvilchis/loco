import React from 'react';
import Details from './Details.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details : false
    }
    this.showDetails = this.showDetails.bind(this)
  }
  // we want a route status, but that needs to be related to the number of incoming complaints
  showDetails() {
    console.log('whoop')
  }

  render() {
    return (
      <div className="nav-properties trainline_row">
        <div className="route-id">
          {this.props.route}
        </div>
         <div className="route-status">
          {this.props.status.status}
        </div>
        <div className="trainline_user">
        </div>
        <button onClick={this.showDetails}>
          Details
        </button>
      </div>
    )
  }
}