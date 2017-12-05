import React from 'react';
import Details from './Details.jsx';
import NavComponent from './NavComponent.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrains: this.props.info,
      currentStatus: ''
    }
    // this.showDetails = this.showDetails.bind(this)
    // this.goBack = this.goBack.bind(this)
  }
  // we want a route status, but that needs to be related to the number of incoming complaints
  componentDidMount() {
    e.preventDefault();
    // get routes for given line and it's current status
    axios.get(`/api/test/service?${this.props.info.name}`)
    .then((trains) => {
      this.setState({
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
        {this.state.currentTrains.map((train) => 
          <NavComponent status={this.state.currentStatus}
            nav={train}
          />
        )}
      </div>
    )
  }
}
