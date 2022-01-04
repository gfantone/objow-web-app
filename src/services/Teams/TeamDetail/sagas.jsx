import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getTeamDetailSuccess, getTeamDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamDetail(action) {
    try {
        var [{data: team}, {data: collaborators}, {data: rank}] = yield all([
            call(api.teams.detail, action.id),
            call(api.teams.collaborators, action.id),
            call(api.teams.generalRank, action.id)
        ]);
        team.collaborators = collaborators;
        team.rank = rank;
        yield put(getTeamDetailSuccess(team))
    } catch(e) {
        yield put(getTeamDetailError())
    }
}

function* getTeamDetailByAccount(action) {
    try {
        const { data: team } = yield call(api.account.team);
        if (team) {
            const {data: collaborators} = yield call(api.teams.collaborators, team.id);
            team.collaborators = collaborators;
        }
        yield put(getTeamDetailSuccess(team))
    } catch(e) {
        yield put(getTeamDetailError())
    }
}

export function* watchTeamDetail() {
    yield takeLatest(types.GET_TEAM_DETAIL, getTeamDetail)
}

export function* watchTeamDetailByAccount() {
    yield takeLatest(types.GET_TEAM_DETAIL_BY_ACCOOUNT, getTeamDetailByAccount)
}
