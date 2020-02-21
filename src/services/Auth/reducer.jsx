import * as types from './actionTypes';
import initialState from '../../store/initialState';

const Auth = (state = initialState.auth, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, account: null, loading: true, error: null }
            
        case types.LOGIN_SUCCESS:
                return { ...state, account: action.account, loading: false, error: null }

        case types.LOGIN_ERROR:
                return { ...state, account: null, loading: false, error: action.error }

        case types.CLEAR_LOGIN:
                return { ...state, account: null, loading: false, error: null }

        default:
            return state;
    }
}

export default Auth;