import * as actionTypes from './actionTypes'

export const getGoalDefinitionPointRepartitionList = () => {
    return {
        type: actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST
    }
}

export const getGoalDefinitionPointRepartitionListSuccess = (pointRepartitions) => {
    return {
        type: actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST_SUCCESS,
        pointRepartitions
    }
}

export const getGoalDefinitionPointRepartitionListError = () => {
    return {
        type: actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST_ERROR
    }
}
