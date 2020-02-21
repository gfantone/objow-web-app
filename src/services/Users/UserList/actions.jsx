import * as types from './actionTypes'

export const getUserList = (isActive) => {
    return {
        type: types.GET_USER_LIST,
        isActive
    }
};

export const getUserListSuccess = (users) => {
    return {
        type: types.GET_USER_LIST_SUCCESS,
        users
    }
};

export const getUserListError = () => {
    return {
        type: types.GET_USER_LIST_ERROR
    }
};