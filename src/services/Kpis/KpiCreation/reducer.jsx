import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const KpiCreation = (state = initialState.kpiCreation, action) => {
  switch (action.type) {
    case types.CREATE_KPI:
      return { ...state, success: null, loading: true, hasError: false };

    case types.CREATE_KPI_SUCCESS:
      return { ...state, success: true, loading: false, hasError: false };

    case types.CREATE_KPI_ERROR:
      return { ...state, success: false, loading: false, hasError: true };

    default:
      return state;
  }
};

export default KpiCreation;
