import {call, put, takeLatest} from 'redux-saga/effects'
import {getTeamGlobalPointSummarySuccess, getTeamGlobalPointSummaryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGlobalPointSummary(action) {
    try {
        var periodId = action.periodId
        if (!periodId) {
            const {data: period} = yield call(api.periods.current)
            periodId = period.id
        }
        const {data: summary} = yield call(api.periods.teamGlobalPointSummary, periodId);
        yield put(getTeamGlobalPointSummarySuccess(summary))
    } catch(e) {
        yield put(getTeamGlobalPointSummaryError())
    }
}

function* watchTeamGlobalPointSummaryDetail() {
    yield takeLatest(types.GET_TEAM_GLOBAL_POINT_SUMMARY, getTeamGlobalPointSummary)
}

export default watchTeamGlobalPointSummaryDetail
