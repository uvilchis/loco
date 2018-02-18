import React from 'react';

const StationList = (props) => (
  <div className="station_list">
    Station: 
    <select onChange={props.handleChange}>
      <option>Select a station</option>
      {props.stations.map((el, idx) => 
        <option key={idx} value={el.stop_id}>{el.stop_name}</option>)}
    </select>
  </div>
);

export default StationList;