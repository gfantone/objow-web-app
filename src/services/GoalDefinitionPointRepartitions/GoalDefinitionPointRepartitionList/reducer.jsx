import * as actionTypes from './actionTypes';
import initialState from '../../../store/initialState';

const GoalDefinitionPointRepartitionList = (state = initialState.goalDefinitionPointRepartitionList, action) => {

    switch (action.type) {
        case actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST:
            return {...state, pointRepartitions: null, loading: true, hasError: false}

        case actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST_SUCCESS:
            return {...state, pointRepartitions: action.pointRepartitions, loading: false, hasError: false}

        case actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST_ERROR:
            return {...state, pointRepartitions: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default GoalDefinitionPointRepartitionList
