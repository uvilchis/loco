import React from 'react';
import axios from 'axios';

export default class Complaint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complaint: ''
    }
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitComplaint(e) {
    e.preventDefault();
    tempObj = {};
    tempObj.complaint = this.state.complaint
    axios.post('/complaints', tempObj)
  }

  render() {
    return (
      <div className="complaint">
        Let us know how NYC can serve you better by providing additonal 
        information about your delay below!
        <input
          name="complaint"
          value={this.state.complaint}
          placeholder="your concerns here..."
          onChange={this.handleInput}
        />
        <button onClick={this.submitComplaint} >
          Submit 
        </button>
      </div>
    )
  }
}