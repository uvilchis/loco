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
      display: 'deets'
    }
    this.addVote = this.addVote.bind(this)
    this.downVote = this.downVote.bind(this)
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

  render() {
    return (
      <div>
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
          </div>
        </div>
      </div>
    ) 
  }
}
