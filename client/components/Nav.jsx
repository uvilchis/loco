import React from 'react';
import Details from './Details.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrains: [],
      currentStatus: ''
    }
    this.showDetails = this.showDetails.bind(this)
    this.goBack = this.goBack.bind(this)
  }
  // we want a route status, but that needs to be related to the number of incoming complaints
  componentDidMount() {
    e.preventDefault();
    // get routes for given line and it's current status
    axios.get(`/api/test/getroutesandstatus?${this.props.info.name}`)
    .then((trains) => {
      this.setState({
        currentTrains: trains.data.routes,
        currentStatus: trains.data.status
      })
    })
    .catch((err) => {
      console.error('ERROR MOUNTING NAV DATA:', err)
    })
  }

  // showDetails() {
  // this.props.showCurrentRoute(this.props.route, this.props.currentStatus)
  // }

  // goBack() {
  //   console.log('go back')
  // }

  render() {
    console.log(this.props, 'props')
    return (
      <div className="nav-properties trainline_row">
        <div className="route-id">
          {this.props.route}
        </div>
         <div className="route-status">
          {/* {this.props.status.status} */}
        </div>
        <div className="trainline_user">
        </div>
        <button onClick={this.showDetails}>
          Details
        </button>
      </div>
    )
  }
}
