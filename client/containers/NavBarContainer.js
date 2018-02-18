import { connect } from 'react-redux';
import { tryLogOut } from '../actions/login';

import NavBar from '../components/navbar/NavBar.jsx';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut() {
      dispatch(tryLogOut());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);