import {call, put, takeLatest} from 'redux-saga/effects'
import {getRewardSuccess, getRewardError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getReward(action) {
    try {
        const {data: reward} = yield call(api.rewards.get, action.id)
        yield put(getRewardSuccess(reward))
    } catch(e) {
        yield put(getRewardError())
    }
}

function* watchRewardDetail() {
    yield takeLatest(types.GET_REWARD, getReward)
}

export default watchRewardDetail
