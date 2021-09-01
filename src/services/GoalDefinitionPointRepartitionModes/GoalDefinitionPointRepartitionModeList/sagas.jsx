import { call, put, takeEvery } from 'redux-saga/effects'
import { getGoalDefinitionPointRepartitionModeListSuccess, getGoalDefinitionPointRepartitionModeListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitionPointRepartitionModeList(action) {
    try {
        const { data: modes } = yield call(api.goalDefinitionPointRepartitionModes.list)
        yield put(getGoalDefinitionPointRepartitionModeListSuccess(modes))
    } catch(e) {
        yield put(getGoalDefinitionPointRepartitionModeListError())
    }
}

function* watchGoalDefinitionPointRepartitionModeList() {
    yield takeEvery(actionTypes.GET_GOAL_DEFINITION_POINT_REPARTITION_MODE_LIST, getGoalDefinitionPointRepartitionModeList)
}

export default watchGoalDefinitionPointRepartitionModeList
