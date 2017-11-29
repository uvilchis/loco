import React from 'react';

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      late: 0,
      delayed: 0, 
      noShow: 0, 
      accident: 0, 
      crowded: 0, 
      other: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleComplaint = this.handleComplaint.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: this.state.name + 1;
    })
  }

  handleComplaint(e) {
    e.preventDefault();
    // redirect to complaints page or login/signup
  }

  render() {
    return (
      <div>
        How was your transportation disrupted? 
        <div className="suvey-buttons">
          <button
            name="late"
            onClick={this.handleClick}
          >
            LATE 
          </button>
          <button
            name="delayed"
            onClick={this.handleClick}
          >
            DELAYED 
          </button>
          <button
            name="noShow"
            onClick={this.handleClick}
          >
            NO SHOW 
          </button>
          <button
            name="accident"
            onClick={this.handleClick}
          >
            ACCIDENT 
          </button>
          <button
            name="other"
            onClick={this.handleComplaint}
          >
            OTHER  
          </button>
        </div>
      </div>
    )
  }
}