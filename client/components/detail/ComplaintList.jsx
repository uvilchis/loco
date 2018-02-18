import React from 'react';
import Complaint from './Complaint.jsx';

const ComplaintList = (props) => (
  <div className="complaints-list">
    {props.complaints.map((complaint, idx) => 
      <Complaint
        key={idx}
        name={complaint.name}
        count={complaint.count}
        handleComplaintSubmit={props.handleComplaintSubmit} />
    )}
  </div>
);

export default ComplaintList