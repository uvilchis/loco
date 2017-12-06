import React from 'react';
import Survey from './Survey.jsx';
import StaticDeets from './StaticDeets.jsx';
import axios from 'axios';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: '',
      upvotes: 0,
      downvotes: 0,
      comments: [],
      staticSched: [],
      realTimeSched: [],
      stations : {},
      value : ''
    };
    this.addVote = this.addVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // we're fetching several things at each details page
    // 1) The number of complaints : we have that endpoint
    // 2) The static schedule for a particular station
    // 3) when we incorporate a comments page, we'll need to display those too (priority TBD)
    let routeId = this.props.match.params.routeId;
    this.setState({ routeId }, () => {
      axios.get('/api/route/stops', {
        params: { route_id: this.state.routeId }
      })
      .then((data) => {
        console.log(data.data);
        this.setState({stations: data.data}, () => console.log(this.state.stations));
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

  addVote(e) {
    // e.preventDefault()
    // this.setState({
    //   upvotes: this.state.upvotes + 1
    // })
  }

  downVote(e) {
    // e.preventDefault()
    // this.setState({
    //   downVotes: this.state.downVotes + 1
    // }, this.props.setAppState('deets'));
  }

  handleChange(event) {
    // show the train schedule for this line at this station
    // a note: we'll want the schedules displayed to vary based on weekday, saturday or sunday
    // so our app will have to know what day it is
    // TODO: probably not the best to have the time parse happening in here, ideally we should be filtering what is returned from the database accoriding to the current time
    // TODO: (cont.) something like SELECT 20 entries where time is greater than current time
    this.setState({value : event.target.value}, () => {
      axios.get('/api/times/stoproute', {
        params : {
          stop_id : this.state.value,
          route_id : this.state.routeId,
          route_type : 'wkd'
        }
      })
      .then(({ data }) => {
        console.log(new Date().toLocaleTimeString('en-GB'));
        console.log(data);
        let relevantSched = data.filter((el) => el.arrival_time >= currentTime).slice(0, 10);
        this.setState({staticSched : relevantSched})
      })
      .catch((error) => console.log(error));
    });
  }

  render() {
    return (
      <div>
        <div className="line-logo">
          {this.state.routeId}
        </div>
        <div className="vote-row">
          <div className="vote-count">
            {this.state.upvotes}
          </div>
          <button onClick={this.addVote}>
            (thumbs up)
          </button>
        </div>
        <div className="vote-row">
          <div className="vote-count">
            {this.state.downVotes}
          </div>
          <button onClick={this.downVote}>
            (thumbs down)
          </button>
        </div>
        <div className="schedule">
          <div className="adj-sched">
            Uptown Schedule:
            {this.state.stations.N ? 
              <select onChange={this.handleChange}>
                {this.state.stations.N.map((element, idx) => 
                  <option key={idx} value={element.stop_id}>{element.stop_name}</option>)}
              </select> : null}
          </div>
          <div className="adj-sched">
            Downtown Schedule:
            {this.state.stations.S ?
              <select onChange={this.handleChange}>
                {this.state.stations.S.map((element, idx) => 
                  <option key={idx} value={element.stop_id}>{element.stop_name}</option>)}
              </select> : null}
          </div>
          <div className="adj-sched">
            {this.state.staticSched.map((element, idx) => {
              return <div key={idx}>{element.arrival_time}</div>
            })}
          </div>
          <div className="user-comments">
            Complaints:
            {this.state.comments.map((comment, idx) => {
              return <div key={idx}>{comment}</div>
            })}
          </div>
        </div>
      </div>
    );
  }
}
