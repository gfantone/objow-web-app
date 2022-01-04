import { call, put, takeLatest } from 'redux-saga/effects'
import { getTeamCategoryRankListSuccess, getTeamCategoryRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCategoryRankListByCategory(action) {
    try {
        const { data: ranks } = yield call(api.categories.teamRanks, action.categoryId, action.periodId);
        yield put(getTeamCategoryRankListSuccess(ranks))
    } catch(e) {
        yield put(getTeamCategoryRankListError())
    }
}

function* getTeamCategoryRankListByTeam(action) {
    try {
        const { data: ranks } = yield call(api.teams.categoryRanks, action.teamId, action.year);
        yield put(getTeamCategoryRankListSuccess(ranks))
    } catch(e) {
        yield put(getTeamCategoryRankListError())
    }
}

export function* watchTeamCategoryRankListByCategory() {
    yield takeLatest(types.GET_TEAM_CATEGORY_RANK_LIST_BY_CATEGORY, getTeamCategoryRankListByCategory)
}

export function* watchTeamCategoryRankListByTeam() {
    yield takeLatest(types.GET_TEAM_CATEGORY_RANK_LIST_BY_TEAM, getTeamCategoryRankListByTeam)
}