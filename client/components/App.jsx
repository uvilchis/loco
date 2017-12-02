import React from 'react';
import axios from 'axios';
import TrainLine from './TrainLine.jsx';
import mockData from '../mockservice.json';
import Details from './Details.jsx';
import Survey from './Survey.jsx';
import Complaint from './Complaint.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      stops: [],
      routes : [],
      organized : [],
      user: null,
      displayed : 'main',
      route_id: ''
    };
    this.onClick = this.onClick.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.routeOrganizer = this.routeOrganizer.bind(this)
  }

  componentDidMount() {
    axios('/api/test/service')
    .then((data) => {
      this.setState({trains: data.data.lines});
      console.log(this.state.trains)
    }).then(() => {
      let organized = this.routeOrganizer();
      this.setState({organized: organized})
      console.log(this.state.organized)
    })

    axios('/api/test/routes')
    .then((data) => {
      this.setState({routes: data.data})
      console.log(this.state.routes)
    })
  }

  onClick() {
    axios.get('/routes')
    .then((data) => {
      console.log('fetched', data)
      this.setState({trains : data.data})
    })
    .catch((error) => console.log('failed', error));
  }

  setAppState(input) {
    // lets call setState on this.state.trains
    // change the array being mapped over to the appropriate info from organized
    this.setState({trains: input})
  }

  routeOrganizer () {
    let organized = {};
    for (var j = 0; j < this.state.trains.length; j++) {
      for (var i = 0; i < this.state.routes.length; i++) {
        if (this.state.trains[j].name.match(`${this.state.routes[i].route_id}`)){
          if (!organized[this.state.trains[j].name]) {
            organized[this.state.trains[j].name] = [];
            organized[this.state.trains[j].name].push(this.state.routes[i]);
          }  else organized[this.state.trains[j].name].push(this.state.routes[i]);
        }
      }
    }
    return organized
  }

  render() {
    if (this.state.displayed === 'main') {
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
                  line={line || line.route_id}
                  key={idx}
                  loggedIn={this.state.user ? true : false}
                  setAppState={this.setAppState}
                  info={this.state.organized[line.name]}
                />
              )}
            </div>
          </div>
        </div>
      )
    } else if (this.state.displayed === 'details') {
      return (<Details
        displayed={this.state.displayed}
        setAppState={this.setAppState}
      />)
    } else if (this.state.displayed === 'survey') {
      return (<Survey
        setAppState={this.setAppState}
      />)
    } else if (this.state.displayed === 'complaint') {
      return (<Complaint
        setAppState={this.setAppState}
      />)
    }
  }
}
