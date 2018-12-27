import { combineReducers } from 'redux';
import { SET_USER, CLEAR_USER } from '../actions/types';

const intialUserState = {
  currentUser: null,
  isLoading: true
};

const user_reducer = (state = intialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer
});

export default rootReducer;
