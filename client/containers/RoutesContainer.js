import { connect } from 'react-redux';
import { getRoutes } from '../actions/api';

import Routes from '../components/routes/Routes.jsx';

const mapStateToProps = (state) => {
  return {
    routes: state.api.routes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoutes() {
      dispatch(getRoutes());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);