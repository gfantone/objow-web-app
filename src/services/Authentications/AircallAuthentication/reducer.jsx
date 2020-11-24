import * as types from './actionTypes'
import initialState from '../../../store/initialState'

const AircallAuthentication = (state = initialState.aircallAuthentication, action) => {
    switch (action.type) {
        case types.CONNECT_AIRCALL:
            return {...state, redirectUri: null, loading: true, error: null}

        case types.CONNECT_AIRCALL_SUCCESS:
            return {...state, redirectUri: action.redirectUri, loading: false, error: null}

        case types.CONNECT_AIRCALL_ERROR:
            return {...state, redirectUri: null, loading: false, error: action.error}

        case types.CLEAR_AIRCALL_CONNECT:
            return {...state, redirectUri: null, loading: false, error: null}

        default:
            return state
    }
}

export default AircallAuthentication
