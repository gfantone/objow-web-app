import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorDataUpdate = (
  state = initialState.collaboratorDataUpdate,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_COLLABORATOR_DATA:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_COLLABORATOR_DATA_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_COLLABORATOR_DATA_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_COLLABORATOR_DATA_UPDATE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default CollaboratorDataUpdate;
