import React from 'react';

const Complaint = (props) => (
  <div>
    <div style={{ display: "inline-block", marginRight: "7px"}}>
      {`${props.name} : ${props.count}`}
    </div>
    <button complaintname={props.name} style={{ display: "inline-block" }} onClick={props.handleComplaintSubmit}> + </button>
  </div>
);

export default Complaint;
