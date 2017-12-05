import React from 'react';
import Survey from './Survey.jsx';
import StaticDeets from './StaticDeets.jsx';
import axios from 'axios';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 0,
      downvotes: 0,
      comments: [],
      staticSched: [],
      realTimeSched: [],
<<<<<<< HEAD
      display: 'deets'
=======
      display: 'deets',
      stations : [],
      value : ''
>>>>>>> Functional Loco
    }
    this.addVote = this.addVote.bind(this)
    this.downVote = this.downVote.bind(this)
    this.goBack = this.goBack.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // we're fetching several things at each details page
    // 1) The number of complaints : we have that endpoint
    // 2) The static schedule for a particular station
    // 3) when we incorporate a comments page, we'll need to display those too (priority TBD)
    axios('/api/route/stops', {
      params : { route_id : this.props.route }
    })
    .then(data => {
      this.setState({stations: data.data})
      console.log(this.state.stations)
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    // create a query that grabs both the times and the stops in one go
    axios.get('/api/test/stoptimes')
    .then((stopDeets) => {
      this.setState({
        staticSched: stopDeets.data
      }, (newState) => {
        console.log(this.state)
      })
      console.log(this.state.staticSched)
    })
    .catch((err) => {
      console.error('ERROR IN GETTING STOP DATA', err);
    })
  }

  addVote(e) {
    e.preventDefault()
    this.setState({
      upvotes: this.state.upvotes + 1
    })
  }

  downVote(e) {
    e.preventDefault()
    this.setState({
      downVotes: this.state.downVotes + 1
    }, this.props.setAppState('deets'));
  }

  goBack() {
    this.props.showDetails
  }

  handleChange(event) {
    // show the train schedule for this line at this station
    // a note: we'll want the schedules displayed to vary based on weedkday, saturday or sunday
    // so our app will have to know what day it is
    // TODO: probably not the best to have the time parse happening in here, ideally we should be filtering what is returned from the database accoriding to the current time
    // TODO: (cont.) something like SELECT 20 entries where time is greater than current time
    this.setState({value : event.target.value}, () => {
      axios('/api/times/stoproute', {
        params : {
          stop_id : this.state.value,
          route_id : this.props.route,
          route_type : 'wkd'
        }
      })
      .then(data => {
        let currentTime = new Date().toLocaleTimeString()
        let relevantSched = data.data.filter(element => {
          return element.arrival_time >= currentTime
        }).slice(0, 10)
        this.setState({staticSched : relevantSched})
      })
    })
  }

  render() {
<<<<<<< HEAD
    return (
      <div>
        <div className="line-logo">
        {this.props.route}
        </div>
        <button onClick={this.goBack}>
          Go Back
        </button>
          <div className="vote-row">
          <div className="vote-count">
            {this.state.upvotes}
=======
    switch(true) {
      case this.state.stations.length === 0:
        return (
          <div>
            <div className="line-logo">
            {this.props.route}
            </div>
            <button onClick={this.goBack}>
              Go Back
            </button>
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
              </div>
              <div className="adj-sched">
                Downtown Schedule:
              </div>
              <div className="adj-sched">
                {this.state.staticSched.map((element, idx) => {
                  return <div>{element}</div>
                })}
              </div>
              <div className="user-comments">
                Complaints:
                {this.state.comments.map((comment, idx) => {
                  return <div>{comment}</div>
                })}
              </div>
            </div>
>>>>>>> Functional Loco
          </div>
        )
        break;

      case this.state.stations.length !== 0 :
      return (
        <div>
          <div className="line-logo">
          {this.props.route}
          </div>
          <button onClick={this.goBack}>
            Go Back
          </button>
<<<<<<< HEAD
        </div>
        <div className="user-comments">
          Complaints:
          {this.state.comments.map((comment, idx) => {
            return <div>{comment}</div>
          })}
        </div>
        <div className="schedule">
          <div className="adj-sched">
            {this.state.realTimeSched.map((element, idx) => {
              return <div>{element}</div>
            })}
          </div>
          <div className="adj-sched">
            Schedule:
            {this.state.staticSched.map((element, idx) => {
              return <StaticDeets sched={element}
                key={idx}
              />
            })}
=======
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
              <select onChange={this.handleChange}>
                {
                  this.state.stations.N.map((element, idx) => {
                    return <option key={idx} value={element.stop_id}>{element.stop_name}</option>
                  })
                }
              </select>
            </div>
            <div className="adj-sched">
            Downtown Schedule:
              <select onChange={this.handleChange}>
                {
                  this.state.stations.S.map((element, idx) => {
                    return <option key={idx} value={element.stop_id}>{element.stop_name}</option>
                  })
                }
              </select>
              <div className="adj-sched">
                {this.state.staticSched.map((element, idx) => {
                  return <div key={idx}>{element.arrival_time}</div>
                })}
              </div>
            </div>
            <div className="user-comments">
              Complaints:
              {this.state.comments.map((comment, idx) => {
                return <div key={idx}>{comment}</div>
              })}
            </div>
>>>>>>> Functional Loco
          </div>
        </div>
      )
        break;

    default:
       return null

    }
  }
}
