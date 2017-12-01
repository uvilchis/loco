import React from 'react';

export default class StaticDeets extends React.Component {
  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <div className="row-of-deets">
        <div className="line">
          {this.props.sched.route_id}
        </div>
        <div className="arrival-time">
          {this.props.sched.arrival_time}
        </div>
      </div>
    )
  }
}