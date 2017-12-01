import React from 'react';
import axios from 'axios';
import TrainLine from './TrainLine.jsx';
import mockData from '../mockservice.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      stops: [],
      user: null
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // Replace this with an axios request in the future
    this.setState({trains: mockData.lines});
  }

  onClick() {
    // axios.get('/test')
    // .then((data) => console.log('fetched', data))
    // .catch((error) => console.log('failed'));
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <div className="logo_container">
            <h1 className="logo">Loco</h1>
          </div>
        </div>
        <div className="trainline">
          <h3 className="trainline_header">Train Status</h3>
          <div className="trainline_container">
            {this.state.trains.map((line, idx) => 
              <TrainLine 
                line={line}
                key={idx} 
                loggedIn={this.state.user ? true : false} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
