import React from 'react';
import Details from './Details.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details : false,
      serviceStatus : ''
    }
    this.showDetails = this.showDetails.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount () {
    this.setState({serviceStatus : this.props.status.status});
  }

  // we want a route status, but that needs to be related to the number of incoming complaints
  showDetails() {
  this.props.showCurrentRoute(this.props.route, this.props.currentStatus)
  }

  goBack() {
    console.log('go back')
  }

  render() {
    switch (true) {
      case this.state.serviceStatus === "GOOD SERVICE":
        return (
          <div className="nav-properties trainline_row">
            <div className="route-id">
              {this.props.route}
            </div>
             <div className="route-status">
              {this.props.status.status}
            </div>
            <div className="trainline_user_good">
            </div>
            <button onClick={this.showDetails}>
            Details
            </button>
          </div>
        )
        break;

      case this.state.serviceStatus !== "GOOD SERVICE":
        return (
          <div className="nav-properties trainline_row">
            <div className="route-id">
              {this.props.route}
            </div>
             <div className="route-status">
              {this.props.status.status}
            </div>
            <div className="trainline_user_problems">
            </div>
            <button onClick={this.showDetails}>
            Details
            </button>
          </div>
        )
      break;

      default:
      return null
    }
  }
}
