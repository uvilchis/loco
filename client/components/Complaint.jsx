import React from 'react';

const Complaint = (props) => {
  return (
    <div>
      <div style={{ display: "inline-block", marginRight: "7px"}}>
        {`${props.complaintname} : ${props.complaintcount}`}
      </div>
      <button complaintname={props.complaintname} style={{ display: "inline-block" }} onClick={props.handleComplaintSubmit}> + </button>
    </div>
  )
}

export default Complaint;


// import React from 'react';
// import axios from 'axios';
//
// export default class Complaint extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       complaint: ''
//     }
//   }
//
//   handleInput(e) {
//     e.preventDefault();
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//
//   submitComplaint(e) {
//     e.preventDefault();
//     tempObj = {};
//     tempObj.complaint = this.state.complaint;
//     axios.post('/postComplaint', tempObj)
//     .then((response) => {
//       res.send(response);
//     })
//     .catch((err) => {
//       console.log('ERROR SUBMITTING', err);
//     })
//   }
//
//   render() {
//     return (
//       <div className="complaint">
//         Let us know how NYC can serve you better by providing additonal
//         information about your delay below!
//         <input
//           name="complaint"
//           value={this.state.complaint}
//           placeholder="your concerns here..."
//           onChange={this.handleInput}
//         />
//         <button onClick={this.submitComplaint} >
//           Submit
//         </button>
//       </div>
//     )
//   }
// }
