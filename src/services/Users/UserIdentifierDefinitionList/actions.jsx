import * as types from './actionTypes';

export const getUserIdentifierDefinitionList = (options) => {
  return {
    type: types.GET_USER_IDENTIFIER_LIST,
    ...options,
  };
};

export const getUserIdentifierDefinitionListSuccess = (
  identifier_definitions
) => {
  return {
    type: types.GET_USER_IDENTIFIER_LIST_SUCCESS,
    definitions: identifier_definitions,
  };
};

export const getUserIdentifierDefinitionListError = () => {
  return {
    type: types.GET_USER_IDENTIFIER_LIST_ERROR,
  };
};

export const getUserIdentifierDefinitionListClear = () => {
  return {
    type: types.GET_USER_IDENTIFIER_LIST_CLEAR,
  };
};
