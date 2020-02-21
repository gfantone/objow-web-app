import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamUpdate = (state = initialState.teamUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_TEAM:
            return {...state, success: false, loading: true, hasError: false}
            
        case types.UPDATE_TEAM_SUCCESS:
                return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_TEAM_ERROR:
                return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_TEAM_UPDATE:
                return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default TeamUpdate