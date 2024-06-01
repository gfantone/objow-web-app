import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let LevelDetail = (state = initialState.levelDetail, action) => {
  switch (action.type) {
    case types.GET_LEVEL_DETAIL:
      return { ...state, level: null, loading: true, hasError: false };

    case types.GET_LEVEL_DETAIL_SUCCESS:
      return { ...state, level: action.level, loading: false, hasError: false };

    case types.GET_LEVEL_DETAIL_ERROR:
      return { ...state, level: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default LevelDetail;
