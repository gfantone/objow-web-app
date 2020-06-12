import {call, put, takeEvery} from 'redux-saga/effects'
import {getRewardListSuccess, getRewardListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorRewardList(action) {
    try {
        const {data: rewards} = yield call(api.rewards.collaborators)
        yield put(getRewardListSuccess(rewards))
    } catch(e) {
        yield put(getRewardListError())
    }
}

export function* watchCollaboratorRewardList() {
    yield takeEvery(types.GET_COLLABORATOR_REWARD_LIST, getCollaboratorRewardList)
}
