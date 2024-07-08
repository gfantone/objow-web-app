import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UnitList = (state = initialState.unitList, action) => {
  switch (action.type) {
    case types.GET_UNIT_LIST:
      return { ...state, units: null, loading: true, hasError: false };

    case types.GET_UNIT_LIST_SUCCESS:
      return { ...state, units: action.units, loading: false, hasError: false };

    case types.GET_UNIT_LIST_ERROR:
      return { ...state, units: null, loading: false, hasError: true };

    default:
      return state;
  }
};

export default UnitList;
