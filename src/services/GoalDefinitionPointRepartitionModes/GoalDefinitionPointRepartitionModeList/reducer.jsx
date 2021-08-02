import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const GoalDefinitionPointRepartitionModeList = (state = initialState.goalDefinitionPointRepartitionModeList, action) => {

    switch (action.type) {
        case actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST:
            return {...state, modes: null, loading: true, hasError: false}

        case actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST_SUCCESS:
            return {...state, modes: action.modes, loading: false, hasError: false}

        case actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST_ERROR:
            return {...state, modes: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default GoalDefinitionPointRepartitionModeList
