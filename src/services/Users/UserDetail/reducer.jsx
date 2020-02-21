import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserDetail = (state = initialState.userDetail, action) => {
    switch (action.type) {
        case types.GET_USER_DETAIL:
            return {...state, user: null, loading: true, hasError: false}
            
        case types.GET_USER_DETAIL_SUCCESS:
                return {...state, user: action.user, loading: false, hasError: false}

        case types.GET_USER_DETAIL_ERROR:
                return {...state, user: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default UserDetail