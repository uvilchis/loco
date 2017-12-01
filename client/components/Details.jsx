import React from 'react';
import Survey from './Survey.jsx';

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
    });
    // include function to  redirect to page to specify/make complaint
  }

  render() {
    return this.state.displayed === 'deets' ? (
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
            {this.state.staticSched.map((element, idx) => {
              return <div>{element}</div>
            })}
          </div>
        </div>
      </div>
    ) : (
      <Survey />
    );
  }
}
