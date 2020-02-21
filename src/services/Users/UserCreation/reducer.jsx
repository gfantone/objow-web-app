import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let UserCreation = (state = initialState.userCreation, action) => {
    switch (action.type) {
        case types.CREATE_USER:
            return {...state, success: false, loading: true, hasError: false}
            
        case types.CREATE_USER_SUCCESS:
                return {...state, success: true, loading: false, hasError: false}

        case types.CREATE_USER_ERROR:
                return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_USER_CREATION:
                return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default UserCreation