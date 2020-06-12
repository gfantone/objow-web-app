import {call, put, takeEvery} from 'redux-saga/effects'
import {getTeamPointSummarySuccess, getTeamPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamPointSummary(action) {
    try {
        const {data: summary} = yield call(api.collaborators.teamPointSummary, action.teamId, action.periodId)
        yield put(getTeamPointSummarySuccess(summary))
    } catch(e) {
        yield put(getTeamPointSummaryError())
    }
}

function* watchTeamPointSummaryDetail() {
    yield takeEvery(types.GET_TEAM_POINT_SUMMARY_DETAIL, getTeamPointSummary)
}

export default watchTeamPointSummaryDetail
