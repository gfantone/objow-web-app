import * as types from './actionTypes';

export const requestEvolution = (request) => {
  return {
    type: types.REQUEST_EVOLUTION,
    request,
  };
};

export const requestEvolutionSuccess = () => {
  return {
    type: types.REQUEST_EVOLUTION_SUCCESS,
  };
};

export const requestEvolutionError = () => {
  return {
    type: types.REQUEST_EVOLUTION_ERROR,
  };
};

export const clearRequestEvolution = () => {
  return {
    type: types.CLEAR_EVOLUTION_REQUEST,
  };
};
