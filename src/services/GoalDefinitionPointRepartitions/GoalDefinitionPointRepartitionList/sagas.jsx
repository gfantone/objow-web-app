import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalDefinitionPointRepartitionListSuccess, getGoalDefinitionPointRepartitionListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionPointRepartitionList(action) {
    try {
        const { data: pointRepartitions } = yield call(api.goalDefinitionPointRepartitions.list, action.definition)
        yield put(getGoalDefinitionPointRepartitionListSuccess(pointRepartitions))
    } catch(e) {
        yield put(getGoalDefinitionPointRepartitionListError())
    }
}

function* watchGoalDefinitionPointRepartitionList() {
    yield takeEvery(actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_LIST, getGoalDefinitionPointRepartitionList)
}

export default watchGoalDefinitionPointRepartitionList
