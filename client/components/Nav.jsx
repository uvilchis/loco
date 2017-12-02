import React from 'react';
import Details from './Details.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details : false,
      currentTrain: ''
    }
    this.showDetails = this.showDetails.bind(this)
  }
  
  showDetails(e) {
    e.preventDefault();
    this.setState({
      details: !this.state.details,
      currentTrain: this.props.route
    })
  }

  render() {
    return (
      <div>
        {this.state.details ? (
          <Details route={this.state.currentTrain} />
        ) : (
          <div className="nav-properties trainline_row">
            <div className="route-id">
              {this.props.route}
            </div>
            <div className="route-status">
              {this.props.status.status}
            </div>
            <div className="trainline_user">
            </div>
            <button onClick={this.showDetails}>
              Details
            </button>
          </div>
        )}     
      </div>
    )
  }
}

// APP NESTED THING:
// render() {
//   return (
//     <div>

//       <div className="navbar">
//         <div className="logo_container">
//           <h1 className="logo">Loco</h1>
//         </div>
//       </div>

//       <div>
//         {this.state.currentTrain.length > 0 ? (
//           this.state.currentTrain === 1 ? (
//             this.state.currentTrain.map((details, idx) =>
//               <Details />
//             )) : (
//               this.state.currentTrain.map((route, idx) => 
//                 <Nav route={route.route_id}
//                      status={this.state.currentStatus}
//                 />
//             )) : (
//               <div>
//                 <h3 className="trainline_header">Train Status</h3>
//                   <div className="trainline_container">
//                     {this.state.trains.map((line, idx) =>
//                       <TrainLine
//                         line={line || line.route_id}
//                         key={idx}
//                         loggedIn={this.state.user ? true : false}
//                         setAppState={this.setAppState}
//                         info={this.state.organized[line.name]}
//                         showCurrentRoute={this.showCurrentRoute}
//                       /> 
//                     )}
//                   </div>
//               </div>
//         )}
//       </div>
//     </div>
//   )
// }
// }