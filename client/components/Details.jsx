import React from 'react';
import axios from 'axios';
import Complaint from './Complaint.jsx';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.defaultComplaints = [
      { name: 'delayed', count: 0 },
      { name: 'closed', count: 0 },
      { name: 'accident', count: 0 },
      { name: 'crowded', count: 0 }
    ];
    this.state = {
      routeId: '',
      staticSched : false,
      direction : false,
      select : false,
      uptownSched: [],
      downtownSched :[],
      stations : {},
      stopId : '',
      submissionStopId : '',
      // Default complaints
      complaints: this.defaultComplaints.map((el) => Object.assign({}, el))
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComplaintSubmit = this.handleComplaintSubmit.bind(this);
    this.handleDirectionSelection = this.handleDirectionSelection.bind(this);
  }

  componentDidMount() {
    // 1) The number of complaints : we have that endpoint
    // 2) when we incorporate a comments page, we'll need to display those too (priority TBD)
    // TODO: Come up with a way for app to detect whether its a weekday, saturday or sunday
    // TODO: Come up with a way to change schedules according to whether its satuday, sunday or a weekday
    let routeId = this.props.match.params.routeId === 'SIR' ? 'SI' : this.props.match.params.routeId
    axios.get('/api/route/stops', {
      params: {
        sub: 'mta',
        route_id: routeId
      }
    })
    .then(({ data }) => {
      this.setState({ routeId, stations: data })
    })
    .catch((error) => console.log(error));
  }

  // Need to implement some way of checking for types of routes, e.g. WKD vs SAT vs SUN
  handleChange(event) {
    let dayNumber = new Date().getDay();
    let dayTranslator = { 0:"SUN", 1:"WKD",  2:"WKD",  3:"WKD",  4:"WKD",  5:"WKD", 6:"SAT" }
    this.setState({ select: false })
    this.setState({ stopId: event.target.value }, () => {
      let newState = {};
      let time = new Date().toLocaleTimeString('en-GB');
      let day = dayTranslator[dayNumber]
      axios.get('/api/times/stoproute/', {
        params: {
          sub: 'mta',
          stop_id: this.state.stopId,
          route_id: this.state.routeId
        }
      })
      .then(({ data }) => {
        newState.uptownSched = data.filter((el) => el.arrival_time >= time && el.route_type === day).slice(0, 10);
        return axios.get('/api/times/stoproute/', {
          params: {
            sub: 'mta',
            stop_id: this.state.stopId.replace(/N$/, 'S'),
            route_id: this.state.routeId
          }
        });
      })
      .then(({ data }) => {
        newState.downtownSched = data.filter((el) => el.arrival_time >= time && el.route_type === day).slice(0, 10);
        newState.staticSched = true;
        newState.direction = false;
        newState.select = true;
        this.setState(newState);
      })
      .catch((error) => console.log(error));
    });
  }

  handleDirectionSelection(event) {
    let newState = {};
    let value = event.target.value;
    this.setState({submissionStopId : value}, ()=> {
      axios.get('/api/report/stoproute', {
        params : {
          sub : 'mta',
          stop_id : this.state.submissionStopId,
          route_id : this.state.routeId
        }
      })
      .then(({ data }) => {
        let defaults = this.defaultComplaints.map((a) => Object.assign({}, a));
        let newComplaints = data.reduce((acc, b) => {
          let temp = acc.find((el) => el.name === b.name);
          temp ? temp.count = b.count : acc.push(b);
          return acc;
        }, defaults);
        newState.complaints = newComplaints;
        newState.direction = true;
        this.setState(newState);
      })
      .catch((error) => console.log(error));
    })
  }

  handleComplaintSubmit(event) {
    let value = event.target.getAttribute('complaintname');
    axios.post('/api/report/add', {
      sub: 'mta',
      type: value,
      stop_id: this.state.submissionStopId,
      route_id: this.state.routeId
    })
    .then(({ data }) => {
      let complaints = this.state.complaints.slice();
      complaints.find((el) => el.name === value).count = data.count;
      this.setState({ complaints });
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <div className="line-logo">
          Route: {this.state.routeId}
        </div>
        <div className="station_select">
        Station:
        {this.state.stations.N ?
          <select onChange={this.handleChange}>
            <option>Select a station</option>
            {this.state.stations.N.map((element, idx) =>
              <option key={idx} value={element.stop_id}>{element.stop_name}</option>)
            }
          </select> : null
        }
        </div>
          <div className="adj-sched" style={{display: "inline-block", marginRight: "7px"}}>
            {this.state.staticSched ? <h1>Uptown</h1> : null}
            {this.state.uptownSched.map((element, idx) =>
              <div key={idx}>{element.arrival_time}</div>)
            }
          </div>
          <div className="adj-sched" style={{display: "inline-block", marginRight: "7px"}}>
            {this.state.staticSched ? <h1>Downtown</h1> : null}
            {this.state.downtownSched.map((element, idx) =>
              <div key={idx}>{element.arrival_time}</div>)
            }
          </div>
          {
            this.state.select ?
            <div>
              <h1>Complaints at This Station</h1>
              <select onChange={this.handleDirectionSelection}>
                <option>Select a direction</option>
                <option value={this.state.stopId}>Uptown</option>
                <option value={this.state.stopId.replace(/N$/, 'S')}>Downtown</option>
              </select>
            </div>
            :
            null
          }
          {this.state.direction ?
            <div className="complaints">
              {
                this.state.complaints.map((complaint, idx) =>
                  <Complaint
                    key={idx}
                    complaintname={complaint.name}
                    complaintcount={complaint.count}
                    handleComplaintSubmit={this.handleComplaintSubmit}
                  />
                )
              }
            </div> : null
          }
        </div>
    );
  }
}
