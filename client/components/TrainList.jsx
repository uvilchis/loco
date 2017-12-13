import React from 'react';
import TrainLine from './TrainLine.jsx';
import TrainHeaders from './TrainHeaders.jsx';

const TrainList = (props) => (
  <div className="trainline_container">
    <TrainHeaders />
    {props.trains.map((line, idx) => 
      <TrainLine key={idx} redir={'nav'} name={line.name} status={line.status}/>)}
  </div>
);

export default TrainList;