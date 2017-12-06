import React from 'react';
import axios from 'axios';
import Details from './Details.jsx';
import TrainLine from './TrainLine.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: '',
      status: ''
    };
  }

  componentDidMount() {
    let routeId = this.props.match.params.routeId;
    axios.get(`/api/service/${routeId}`)
    .then(({ data }) => {
      console.log(data);
      this.setState({
        routes: data.name,
        status: data.status
      });
    })
    .catch((err) => console.error('ERROR MOUNTING NAV DATA:', err));
  }

  render() {
    console.log(this.props);
    let service = this.state.status === 'GOOD SERVICE';
    return (
      <div className="nav-properties">
        {this.state.routes.split('').map((routeName, idx) => 
          <TrainLine
            key={idx}
            redir={'detail'}
            name={routeName}
            status={this.state.status}
          />
        )}
      </div>
    );
  }
}
