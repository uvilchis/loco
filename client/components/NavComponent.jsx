import React from 'react';

const NavComponent = (props) => (
  <div className="nav-properties">
    <div className="route-id">
      {this.props.nav.route_id}
    </div>
    <div className="route-status">
      {this.props.nav.status}
    </div>
    <button onClick={this.showDetails}>
      Details
    </button>
  </div>
)

module.exports = NavComponent