import React from 'react';
import Details from './Details.jsx';

export default class TrainLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route_id: ''
    }
    this.redirect = this.redirect.bind(this);
  }

  redirect () {
    // maybe not
    // this.props.setAppState('display')
    // what if, instead of changing the displayed state
    // you changed the state of what is being mapped over in app
    // that way, you'd retain all the same styling
    this.props.setAppState(this.props.info)
  }

  render() {
    return (
      <div className="trainline_row">
        <div className="trainline_routes">
          {this.props.line.name}
        </div>
        <div className="trainline_status">
          {this.props.line.status}
        </div>
        <div className="trainline_user">
        </div>
        <button onClick={this.redirect} >
          Details
        </button>
      </div>
    )
  }
}
