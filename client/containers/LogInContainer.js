import { connect } from 'react-redux';
import { tryLogIn, trySignUp } from '../actions/login';

import LogIn from '../components/login/LogIn.jsx';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin({ username, password }, redirect) {
      dispatch(tryLogIn({ username, password }), redirect);
    },
    onSignUp({ username, password }) {
      dispatch(trySignUp({ username, password }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);