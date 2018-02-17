import React from 'react';
import { Link } from 'react-router-dom';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import MdPriorityHigh from 'react-icons/lib/md/priority-high';

const RouteGroup = (props) => (
  <div className="trainline_row">
    <div className="trainline_routes">
      {props.name}
    </div>
    <div className="trainline_status">
      {props.status}
    </div>
    <div className={`trainline_user ${props.status === 'GOOD SERVICE' ? 'good' : 'problems'}`}>
    </div>
    {/* <a href={`/${props.redir}/${props.name}`}><MdArrowForward /></a> */}
    {/* <Link className="trainline_button" to={`/${props.redir}/${props.name}`}>
      Details
    </Link> */}
  </div>
);

export default RouteGroup;
