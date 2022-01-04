import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorChallengeGeneralRankListSuccess, getCollaboratorChallengeGeneralRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorChallengeGeneralRankList(action) {
    try {
        const { data: ranks } = yield call(api.periods.collaboratorChallengeRanking, action.periodId);
        yield put(getCollaboratorChallengeGeneralRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorChallengeGeneralRankListError())
    }
}

function* watchCollaboratorChallengeGeneralRankList() {
    yield takeLatest(types.GET_COLLABORATOR_CHALLENGE_GENERAL_RANK_LIST, getCollaboratorChallengeGeneralRankList)
}

export default watchCollaboratorChallengeGeneralRankList