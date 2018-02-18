import React from 'react';

const Schedule = (props) => (
  <div className="adj-sched" style={{ display: 'inline-block', marginRight: '7px'}}>
    <h3>{props.schedType}</h3>
    {props.schedule.map((el, idx) => (
      <div key={idx}>{el.arrival_time}</div>
    ))}
  </div>
);

export default Schedule;
