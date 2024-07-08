import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const TermsAcceptance = (state = initialState.termsAcceptance, action) => {
  switch (action.type) {
    case types.ACCEPT_TERMS:
      return { ...state, success: false, loading: true, hasError: false };

    case types.ACCEPT_TERMS_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.ACCEPT_TERMS_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    default:
      return state;
  }
};

export default TermsAcceptance;
