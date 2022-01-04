import { call, put, takeLatest } from 'redux-saga/effects'
import {getTeamGeneralRankListSuccess, getTeamGeneralRankListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGeneralRankList(action) {
    try {
        const { data: ranking } = yield call(api.periods.teamGeneralRanking, action.periodId);
        yield put(getTeamGeneralRankListSuccess(ranking))
    } catch(e) {
        yield put(getTeamGeneralRankListError())
    }
}

function* watchTeamGeneralRankList() {
    yield takeLatest(types.GET_TEAM_GENERAL_RANK_LIST, getTeamGeneralRankList)
}

export default watchTeamGeneralRankList