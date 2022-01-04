import {call, put, takeLatest} from 'redux-saga/effects'
import {getCollaboratorPointSummarySuccess, getCollaboratorPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorPointSummary(action) {
    try {
        const {data: summary} = yield call(api.collaborators.collaboratorPointSummary, action.collaboratorId, action.periodId)
        yield put(getCollaboratorPointSummarySuccess(summary))
    } catch(e) {
        yield put(getCollaboratorPointSummaryError())
    }
}

function* watchCollaboratorPointSummaryDetail() {
    yield takeLatest(types.GET_COLLABORATOR_POINT_SUMMARY, getCollaboratorPointSummary)
}

export default watchCollaboratorPointSummaryDetail
