import React from 'react';
import axios from 'axios';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: '',
      comments: [],
      staticSched : false,
      uptownSched: [],
      downtownSched :[],
      stations : {},
      value : '',
      routeIssues : {},
      delayed : 0,
      closed : 0,
      accident: 0,
      crowded : 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComplaintSubmit = this.handleComplaintSubmit.bind(this);
  }

  componentDidMount() {
    // 1) The number of complaints : we have that endpoint
    // 2) when we incorporate a comments page, we'll need to display those too (priority TBD)
    // TODO: Come up with a way for app to detect whether its a weekday, saturday or sunday
    // TODO: Come up with a way to change schedules according to whether its satuday, sunday or a weekday
    let routeId = this.props.match.params.routeId;
    this.setState({ routeId }, () => {
      // sets the routeId in the parent state
      axios.get('/api/route/stops', {
        params: { route_id: this.state.routeId }
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({stations: data}, () => console.log(this.state.stations));
      })
      .catch((err) => {
        console.log(err);
      });
      // sends the request that returns counts across problem categories experienced by the route
      axios.get('/api/report/typecomplaintsbyroute', {
        params : { route_id : this.state.routeId }
      }).then(({ data }) => {
        console.log(data)
        this.setState({routeIssues : data}, () => console.log(this.state.routeIssues));
      })
      .catch(err => {
        console.log(err)
      });
    });
  }

  handleChange(event) {
    this.setState({value : event.target.value}, () => {
      let north = this.state.value
      let south = this.state.value.replace(/N$/, 'S')
      console.log(south)

      axios.get('/api/times/stoproute', {
        params : {
          stop_id : `${north}`,
          route_id : this.state.routeId,
          route_type : 'wkd'
        }
      })
      .then(({ data }) => {
        let currentTime = new Date().toLocaleTimeString('en-GB')
        let relevantSched = data.filter((el) => el.arrival_time >= currentTime).slice(0, 10);
        console.log(data)
        this.setState({uptownSched: relevantSched})
        this.setState({staticSched: true})
      })
      .catch((error) => console.log(error));

      axios.get('/api/times/stoproute', {
        params : {
          stop_id : `${south}`,
          route_id : this.state.routeId,
          route_type : 'wkd'
        }
      })
      .then(({ data }) => {
        let currentTime = new Date().toLocaleTimeString('en-GB')
        let relevantSched = data.filter((el) => el.arrival_time >= currentTime).slice(0, 10);
        console.log(data)
        this.setState({downtownSched: relevantSched})
      })
      .catch((error) => console.log(error));

      axios.get('/api/report', {
        params : {
          type : 'delayed',
          stop_id : this.state.value,
          route_id : this.state.routeId
        }
      }).then(({ data }) => {
        console.log(data)
        this.setState({delayed : data.count}, () => console.log(this.state.delayed));
      })
      .catch(err => {
        this.setState({delayed: 0})
      });

      axios.get('/api/report', {
        params : {
          type : 'closed',
          stop_id : this.state.value,
          route_id : this.state.routeId
        }
      }).then(({ data }) => {
        console.log(data)
        this.setState({closed : data.count}, () => console.log(this.state.closed));
      })
      .catch(err => {
        this.setState({closed: 0})
      });

      axios.get('/api/report', {
        params : {
          type : 'accident',
          stop_id : this.state.value,
          route_id : this.state.routeId
        }
      }).then(({ data }) => {
        console.log(data)
        this.setState({accident : data.count}, () => console.log(this.state.accident));
      })
      .catch(err => {
        this.setState({accident: 0})
      });

      axios.get('/api/report', {
        params : {
          type : 'crowded',
          stop_id : this.state.value,
          route_id : this.state.routeId
        }
      }).then(({ data }) => {
        console.log(data)
        this.setState({crowded : data.count}, () => console.log(this.state.crowded));
      })
      .catch(err => {
        this.setState({crowded: 0})
      });

      axios.get('/api/report/typecomplaintsbyroute', {
        params : { route_id : this.state.routeId }
      }).then(({ data }) => {
        console.log(data)
        this.setState({routeIssues : data}, () => console.log(this.state.routeIssues));
      })
      .catch(err => {
        console.log(err)
      });


    });
  }

  handleComplaintSubmit(input) {
    axios.post('/api/report/add', {
      type : input,
      stop_id : this.state.value,
      route_id : this.state.routeId
    })
    .then(data => {
      switch (true) {
        case input === 'delayed':
          this.setState({delayed : data.data.count}, () => console.log(data.data.count))
          break;
        case input === 'closed':
          this.setState({closed : data.data.count}, ()=> console.log(data.data.count))
          break;
        case input === 'accident':
          this.setState({accident: data.data.count}, ()=> console.log(data.data.count))
          break;
        case input === 'crowded':
          this.setState({crowded: data.data.count}, ()=> console.log(data.data.count))
          break;
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="line-logo">
          Route: {this.state.routeId}
        </div>
        <div className="vote-row">
        <div style={{display: "inline-block", marginRight: "7px"}} onClick={() => {this.handleComplaintSubmit('delayed')}}>
          Accident : {this.state.routeIssues.delayed}
        </div>
        <div style={{display: "inline-block", marginRight: "7px"}}  onClick={() => {this.handleComplaintSubmit('closed')}}>
          Closed : {this.state.routeIssues.closed}
        </div>
        <div style={{display: "inline-block", marginRight: "7px"}}  onClick={() => {this.handleComplaintSubmit('accident')}}>
          Accident : {this.state.routeIssues.accident}
        </div>
        <div style={{display: "inline-block", marginRight: "7px"}}  onClick={() => {this.handleComplaintSubmit('crowded')}}>
          Crowded : {this.state.routeIssues.crowded}
        </div>
        </div>
        <div className="station_select">
        Select a station
        {
          this.state.stations.N ?
          <select onChange={this.handleChange}>
            {
              this.state.stations.N.map((element, idx) =>
              <option key={idx} value={element.stop_id}>{element.stop_name}</option>)
            }
          </select> :
          null
        }
        </div>
          <div className="adj-sched" style={{display: "inline-block", marginRight: "7px"}}>
            {this.state.staticSched ? <h1>Uptown</h1> : null}
            {this.state.uptownSched.map((element, idx) => {
              return <div key={idx}>{element.arrival_time}</div>
            })}
          </div>
          <div className="adj-sched" style={{display: "inline-block", marginRight: "7px"}}>
            {this.state.staticSched ? <h1>Downtown</h1> : null}
            {this.state.downtownSched.map((element, idx) => {
              return <div key={idx}>{element.arrival_time}</div>
            })}
          </div>
          <div className="user-comments">
            {this.state.comments.map((comment, idx) => {
              return <div key={idx}>{comment}</div>
            })}
          </div>

          {this.state.staticSched ? <h1>Complaints at This Station</h1> : null}

          {
            this.state.staticSched ?
            <div className="complaints">
              <div>
                <div style={{display: "inline-block", marginRight: "7px"}}>Delayed : {this.state.delayed}</div>
                <button style={{display: "inline-block"}} onClick={() => this.handleComplaintSubmit('delayed')}> + </button>
              </div>
              <div>
                <div style={{display: "inline-block", marginRight: "7px"}}>Closed : {this.state.closed}</div>
                <button style={{display: "inline-block"}} onClick={() => this.handleComplaintSubmit('closed')}> + </button>
              </div>
              <div>
                <div style={{display: "inline-block", marginRight: "7px"}}>Accident : {this.state.accident}</div>
                <button style={{display: "inline-block"}} onClick={() => this.handleComplaintSubmit('accident')}> + </button>
              </div>
              <div>
                <div style={{display: "inline-block", marginRight: "7px"}}>Crowded : {this.state.crowded}</div>
                <button style={{display: "inline-block"}} onClick={() => this.handleComplaintSubmit('crowded')}> + </button>
              </div>
            </div> :
            null
          }
        </div>
    );
  }
}
