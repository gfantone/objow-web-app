import { call, put, takeLatest } from 'redux-saga/effects'
import { getGoalDefinitionRepartitionListSuccess, getGoalDefinitionRepartitionListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionRepartitionList(action) {
    try {
        const { data: repartitions } = yield call(api.goalDefinitionRepartitions.list)
        yield put(getGoalDefinitionRepartitionListSuccess(repartitions))
    } catch(e) {
        yield put(getGoalDefinitionRepartitionListError())
    }
}

function* watchGoalDefinitionRepartitionList() {
    yield takeLatest(actionTypes.GET_GOAL_DEFINITION_REPARTITION_LIST, getGoalDefinitionRepartitionList)
}

export default watchGoalDefinitionRepartitionList
