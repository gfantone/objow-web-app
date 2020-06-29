import {call, put, takeEvery} from 'redux-saga/effects'
import {getRewardListSuccess, getRewardListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getActiveRewardList(action) {
    try {
        const {data: rewards} = yield call(api.rewards.active, action.categoryId)
        yield put(getRewardListSuccess(rewards))
    } catch(e) {
        yield put(getRewardListError())
    }
}

export function* watchActiveRewardList() {
    yield takeEvery(types.GET_ACTIVE_REWARD_LIST, getActiveRewardList)
}

export default watchActiveRewardList
