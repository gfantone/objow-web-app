import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorPointSummaryDetail = (
  state = initialState.collaboratorPointSummaryDetail,
  action,
) => {
  switch (action.type) {
    case types.GET_COLLABORATOR_POINT_SUMMARY:
      return { ...state, summary: null, loading: true, hasError: false };

    case types.GET_COLLABORATOR_POINT_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.summary,
        loading: false,
        hasError: false,
      };

    case types.GET_COLLABORATOR_POINT_SUMMARY_ERROR:
      return { ...state, summary: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default CollaboratorPointSummaryDetail;
