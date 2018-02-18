import React from 'react';

const Info = (props) => {
  let last = props.report.slice(-1).toUpperCase()

  let stationId = props.report.slice(-4).toUpperCase()
  let type = props.report.slice(4,-5)
  let direction = last === 'N' ? 'Uptown' : 'Downtown'


  if (props.stations[last]) {
    var match = props.stations[last].filter((station) => station.stop_id === stationId)
    return (<h1 style={{"color" : "red"}}>{`${props.count} ${type} reports for ${direction} ${match[0].stop_name} trains`}</h1>)
  }
  else return null
}

export default Info
