import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let BadgeDetail = (state = initialState.badgeDetail, action) => {
  switch (action.type) {
    case types.GET_BADGE_DETAIL:
      return { ...state, badge: null, loading: true, hasError: false };

    case types.GET_BADGE_DETAIL_SUCCESS:
      return { ...state, badge: action.badge, loading: false, hasError: false };

    case types.GET_BADGE_DETAIL_ERROR:
      return { ...state, badge: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default BadgeDetail;
