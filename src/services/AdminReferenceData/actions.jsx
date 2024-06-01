import * as types from './actionTypes';

export const getAdminReferenceData = () => {
  return {
    type: types.GET_ADMIN_REFERENCE_DATA,
  };
};

export const getAdminReferenceDataSuccess = (
  categories,
  categoryIcons,
  goalTypes,
  kpis,
  periodicities,
) => {
  return {
    type: types.GET_ADMIN_REFERENCE_DATA_SUCCESS,
    categories,
    categoryIcons,
    goalTypes,
    kpis,
    periodicities,
  };
};

export const getAdminReferenceDataError = () => {
  return {
    type: types.GET_ADMIN_REFERENCE_DATA_ERROR,
  };
};
