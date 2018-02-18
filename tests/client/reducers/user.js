import userReducer from '../../../client/reducers/user';
import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  CHECK_LOGGED_SUCCESS,
  CHECK_LOGGED_FAIL,
  LOG_ERROR
} from '../../../client/actions/user';

describe('userReducers', () => {
  it('should have a default state of loggedIn: false and favorites": []', () => {
    let reduced = userReducer(undefined, 'invalid action');
    let expected = { loggedIn: false, favorites: [] }
    expect(reduced).toEqual(expected);
  });

  it('should accept LOG_IN_SUCCESS', () => {
    let action = { type: LOG_IN_SUCCESS, loggedIn: true };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: true, favorites: [] };
    expect(reduced).toEqual(expected);
  });

  it('should accept LOG_OUT_SUCCESS', () => {
    let action = { type: LOG_OUT_SUCCESS, loggedIn: false };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: false, favorites: [] };
    expect(reduced).toEqual(expected);
  });

  it('should accept SIGN_UP_SUCCESS', () => {
    let action = { type: SIGN_UP_SUCCESS, loggedIn: true };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: true, favorites: [] };
    expect(reduced).toEqual(expected);
  });

  it('should accept SIGN_UP_FAIL', () => {
    let action = { type: SIGN_UP_FAIL, loggedIn: false };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: false, favorites: [] };
    expect(reduced).toEqual(expected);
  });

  it('should accept CHECK_LOGGED_SUCCESS', () => {
    let action = { type: CHECK_LOGGED_SUCCESS, loggedIn: true };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: true, favorites: [] };
    expect(reduced).toEqual(expected);
  });

  it('should accept CHECK_LOGGED_FAIL', () => {
    let action = { type: CHECK_LOGGED_FAIL, loggedIn: false };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: false, favorites: [] };
    expect(reduced).toEqual(expected);
  });

  it('should accept LOG_ERROR', () => {
    let action = { type: LOG_ERROR, loggedIn: true };
    let reduced = userReducer(undefined, action);
    let expected = { loggedIn: true, favorites: [] };
    expect(reduced).toEqual(expected);
  });
});