import {call, put, takeEvery} from 'redux-saga/effects'
import {getTeamGlobalPointSummarySuccess, getTeamGlobalPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGlobalPointSummary(action) {
    try {
        const {data: summary} = yield call(api.periods.teamGlobalPointSummary, action.periodId);
        yield put(getTeamGlobalPointSummarySuccess(summary))
    } catch(e) {
        yield put(getTeamGlobalPointSummaryError())
    }
}

function* watchTeamGlobalPointSummaryDetail() {
    yield takeEvery(types.GET_TEAM_GLOBAL_POINT_SUMMARY, getTeamGlobalPointSummary)
}

export default watchTeamGlobalPointSummaryDetail
