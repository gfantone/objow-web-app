import * as types from './actionTypes'
import initialState from '../../../store/initialState'

const AircallAuthentication = (state = initialState.aircallAuthentication, action) => {
    switch (action.type) {
        case types.CONNECT_AIRCALL:
            return {...state, success: false, loading: true, error: null}

        case types.CONNECT_AIRCALL_SUCCESS:
            return {...state, success: true, loading: false, error: null}

        case types.CONNECT_AIRCALL_ERROR:
            return {...state, success: false, loading: false, error: action.error}

        case types.CLEAR_AIRCALL_CONNECT:
            return {...state, success: false, loading: false, error: null}

        default:
            return state
    }
}

export default AircallAuthentication
