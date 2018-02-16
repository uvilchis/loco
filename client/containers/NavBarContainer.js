import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut, logIn } from '../actions';

import NavBar from '../components/navbar/NavBar.jsx';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logOut, logIn }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);