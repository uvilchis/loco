import React from 'react';
import axios from 'axios';
import Details from './Details.jsx';
import NavComponent from './NavComponent.jsx';

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

  // componentDidMount () {
    // this.setState({serviceStatus : this.props.status.status});
    //   currentTrains: [],
    //   currentStatus: ''
    // }
    // this.props.info
    // this.showDetails = this.showDetails.bind(this)
    // this.goBack = this.goBack.bind(this)
  // }

  // we want a route status, but that needs to be related to the number of incoming complaints
  componentDidMount() {
    // get routes for given line and it's current status
    console.log(this.props);
    if (this.props.location) {
      return this.setState({ currentTrains: this.props.location.state.info });
    }
    let routeId = this.props.match.params.routeId;
    axios.get(`/api/service/${routeId}`)
    .then((data) => {
      console.log(data);
      // this.setState({
      //   currentStatus: trains.data.status
      // })
    })
    .catch((err) => {
      console.error('ERROR MOUNTING NAV DATA:', err)
    })
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
    // return (
    //   <div className="nav-properties trainline_row">
    //     {this.state.currentTrains.map((route, i) => 
    //       <NavComponent key={i} status={this.state.currentStatus}
    //         route={route}
    //       />
    //     )}
    //   </div>
    // )
  }
}
