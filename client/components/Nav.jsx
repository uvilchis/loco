import React from 'react';
import axios from 'axios';
import Details from './Details.jsx';
import TrainLine from './TrainLine.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: '',
      status: '',
      serviceStatus : ''
    };
  }

  // we want a route status, but that needs to be related to the number of incoming complaints
  componentDidMount() {
    // get routes for given line and it's current status
    // console.log(this.props);
    // if (this.props.location) {
    //   return this.setState({ currentTrains: this.props.location.state.info });
    // }
    let routeId = this.props.match.params.routeId;
    axios.get(`/api/service/${routeId}`)
    .then(({ data }) => {
      console.log(data);
      this.setState({
        routes: data.name,
        status: data.status
      });
    })
    .catch((err) => {
      console.error('ERROR MOUNTING NAV DATA:', err);
    });
  }

  render() {
    console.log(this.props);
    let service = this.state.serviceStatus === 'GOOD SERVICE';
    return (
      <div className="nav-properties">
        {this.state.routes.split('').map((a, idx) => 
          <TrainLine
            key={idx}
            redir={'detail'}
            name={a}
            status={this.state.status}
          />
        )}
      </div>
    )

    // return (
    //   <div className="nav-properties trainline_row">
    //     <div className="route-id">
    //       {this.state.route}
    //     </div>
    //      <div className="route-status">
    //       {this.state.status.status}
    //     </div>
    //     <div className={service ? 'trainline_user_good' : 'trainline_user_problems'}>
    //     </div>
    //     <button onClick={this.showDetails}>
    //       Details
    //     </button>
    //   </div>
    // )
  }
}
