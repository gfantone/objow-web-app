import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let CollaboratorInputCreation = (
  state = initialState.goalDefinitionCreation,
  action,
) => {
  switch (action.type) {
    case types.CREATE_COLLABORATOR_INPUT:
      return { ...state, input: null, loading: true, hasError: false };

    case types.CREATE_COLLABORATOR_INPUT_SUCCESS:
      return {
        ...state,
        input: action.input,
        success: true,
        loading: false,
        hasError: false,
      };

    case types.CREATE_COLLABORATOR_INPUT_ERROR:
      return {
        ...state,
        input: null,
        success: false,
        loading: false,
        hasError: true,
      };

    case types.CLEAR_COLLABORATOR_INPUT_CREATION:
      return {
        ...state,
        input: null,
        success: false,
        loading: false,
        hasError: false,
      };

    default:
      return state;
  }
};

export default CollaboratorInputCreation;
