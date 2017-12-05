import React from 'react';

const NavComponent = (props) => (
  <div className="nav-properties">
    <div className="route-id">
      {props.route.route_id}
    </div>
    <div className="route-status">
      {props.status}
    </div>
    {/* <button onClick={props.showDetails}> */}
    <button>
      Details
    </button>
  </div>
)

export default NavComponent