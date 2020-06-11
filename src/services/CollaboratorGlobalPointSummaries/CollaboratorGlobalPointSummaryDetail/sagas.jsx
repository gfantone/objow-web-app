import {call, put, takeEvery} from 'redux-saga/effects'
import {getCollaboratorGlobalPointSummarySuccess, getCollaboratorGlobalPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorGlobalPointSummary(action) {
    try {
        const {data: summary} = yield call(api.periods.collaboratorGlobalPointSummary, action.periodId);
        yield put(getCollaboratorGlobalPointSummarySuccess(summary))
    } catch(e) {
        yield put(getCollaboratorGlobalPointSummaryError())
    }
}

function* watchCollaboratorGlobalPointSummaryDetail() {
    yield takeEvery(types.GET_COLLABORATOR_GLOBAL_POINT_SUMMARY, getCollaboratorGlobalPointSummary)
}

export default watchCollaboratorGlobalPointSummaryDetail
