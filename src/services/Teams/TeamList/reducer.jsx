import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let TeamList = (state = initialState.teamList, action) => {
    switch (action.type) {
        case types.GET_TEAM_LIST:
            return {...state, teams: [], loading: true, hasError: false}
            
        case types.GET_TEAM_LIST_SUCCESS:
                return {...state, teams: action.teams, loading: false, hasError: false}

        case types.GET_TEAM_LIST_ERROR:
                return {...state, teams: [], loading: false, hasError: true}

        default:
            return state;
    }
}

export default TeamList;