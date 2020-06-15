import {call, put, takeEvery} from 'redux-saga/effects'
import {getCollaboratorRewardOrderSummaryListSuccess, getCollaboratorRewardOrderSummaryListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getValidatedCollaboratorRewardOrderSummaryList(action) {
    try {
        const {data: orders} = yield call(api.collaboratorRewardOrderSummaries.validated);
        yield put(getCollaboratorRewardOrderSummaryListSuccess(orders))
    } catch(e) {
        yield put(getCollaboratorRewardOrderSummaryListError())
    }
}

function* getWaitingCollaboratorRewardOrderSummaryList(action) {
    try {
        const {data: orders} = yield call(api.collaboratorRewardOrderSummaries.waiting);
        yield put(getCollaboratorRewardOrderSummaryListSuccess(orders))
    } catch(e) {
        yield put(getCollaboratorRewardOrderSummaryListError())
    }
}

export function* watchValidatedCollaboratorRewardOrderSummaryList() {
    yield takeEvery(types.GET_VALIDATED_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST, getValidatedCollaboratorRewardOrderSummaryList)
}

export function* watchWaitingCollaboratorRewardOrderSummaryList() {
    yield takeEvery(types.GET_WAITING_COLLABORATOR_REWARD_ORDER_SUMMARY_LIST, getWaitingCollaboratorRewardOrderSummaryList)
}
