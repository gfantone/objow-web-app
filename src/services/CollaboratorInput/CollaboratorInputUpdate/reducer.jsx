import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorInputUpdate = (
  state = initialState.collaboratorInputUpdate,
  action,
) => {
  switch (action.type) {
    case types.UPDATE_COLLABORATOR_INPUT:
      return { ...state, success: false, loading: true, hasError: false };

    case types.UPDATE_COLLABORATOR_INPUT_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.UPDATE_COLLABORATOR_INPUT_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    case types.CLEAR_COLLABORATOR_INPUT_UPDATE:
      return { ...state, success: false, loading: false, hasError: false };

    default:
      return state;
  }
};

export default CollaboratorInputUpdate;
