import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorGeneralRankListSuccess, getCollaboratorGeneralRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorGeneralRankList(action) {
    try {
        const { data: ranks } = yield call(api.periods.collaboratorGeneralRanking, action.periodId);
        yield put(getCollaboratorGeneralRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorGeneralRankListError())
    }
}

function* watchCollaboratorGeneralRankList() {
    yield takeLatest(types.GET_COLLABORATOR_GENERAL_RANK_LIST, getCollaboratorGeneralRankList)
}

export default watchCollaboratorGeneralRankList