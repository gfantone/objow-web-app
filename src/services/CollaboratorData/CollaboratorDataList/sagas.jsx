import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorDataListSuccess, getCollaboratorDataListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorDataList(action) {
    try {
        const { data } = yield call(api.kpis.collaboratorData, action.kpiId)
        yield put(getCollaboratorDataListSuccess(data))
    } catch(e) {
        yield put(getCollaboratorDataListError())
    }
}

function* watchCollaboratorGoalData() {
    yield takeLatest(types.GET_COLLABORATOR_DATA_LIST, getCollaboratorDataList)
}

export default watchCollaboratorGoalData