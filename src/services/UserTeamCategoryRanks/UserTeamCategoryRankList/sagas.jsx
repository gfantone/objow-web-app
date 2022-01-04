import { call, put, takeLatest } from 'redux-saga/effects'
import {getUserTeamCategoryRankListSuccess, getUserTeamCategoryRankListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUserTeamCategoryRankList(action) {
    try {
        let {data: ranks} = yield call(api.account.teamCategoryRanks)
        yield put(getUserTeamCategoryRankListSuccess(ranks))
    } catch(e) {
        yield put(getUserTeamCategoryRankListError())
    }
}

function* watchUserTeamCategoryRankList() {
    yield takeLatest(types.GET_TEAM_CATEGORY_RANK_LIST, getUserTeamCategoryRankList)
}

export default watchUserTeamCategoryRankList