import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const AccountUpdate = (state = initialState.accountUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_ACCOUNT:
            return { ...state, success: false, loading: true, hasError: false }
            
        case types.UPDATE_ACCOUNT_SUCCESS:
                return { ...state, success: true, loading: false, hasError: false }

        case types.UPDATE_ACCOUNT_ERROR:
                return { ...state, success:false, loading: false, hasError: true }

        default:
            return state
    }
}

export default AccountUpdate