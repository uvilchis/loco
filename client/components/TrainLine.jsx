import React from 'react';
import Nav from './Nav.jsx';
import { Link } from 'react-router-dom';

const TrainLine = (props) => (
  <div>
    <div className="trainline_row">
      <div className="trainline_routes">
        {props.name}
      </div>
      <div className="trainline_status">
        {props.status}
      </div>
      <div className={`trainline_user ${props.status === 'GOOD SERVICE' ? 'good' : 'problems'}`}>
      </div>
      <Link className="trainline_button" to={{
        pathname: `/${props.redir}/${props.name}`,
        // state: { 
        //   info: this.props.info,
        //   line: this.props.line
        // }
        }}>
        Details 
      </Link>
    </div>
  </div>
);

export default TrainLine;