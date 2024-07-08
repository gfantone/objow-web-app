import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorInput = (state = initialState.collaboratorInput, action) => {
  switch (action.type) {
    case types.GET_COLLABORATOR_INPUT_LIST:
      return { ...state, input: null, loading: true, hasError: false };

    case types.GET_COLLABORATOR_INPUT_LIST_SUCCESS:
      return { ...state, input: action.input, loading: false, hasError: false };

    case types.GET_COLLABORATOR_INPUT_LIST_ERROR:
      return { ...state, input: null, loading: false, hasError: true };

    case types.GET_COLLABORATOR_INPUT_LIST_CLEAR:
      return { ...state, input: null, loading: false, hasError: false };

    default:
      return state;
  }
};

export default CollaboratorInput;
