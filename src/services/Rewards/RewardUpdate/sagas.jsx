import {call, put, takeEvery} from 'redux-saga/effects'
import {updateRewardSuccess, updateRewardError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateReward(action) {
    try {
        yield call(api.rewards.update, action.reward)
        yield put(updateRewardSuccess())
    } catch(e) {
        yield put(updateRewardError())
    }
}

function* updateRewardActivation(action) {
    try {
        yield call(api.rewards.updateActivation, action.id, action.isActive)
        yield put(updateRewardSuccess())
    } catch(e) {
        yield put(updateRewardError())
    }
}

export function* watchRewardUpdate() {
    yield takeEvery(types.UPDATE_REWARD, updateReward)
}

export function* watchRewardActivationUpdate() {
    yield takeEvery(types.UPDATE_REWARD_ACTIVATION, updateRewardActivation)
}
