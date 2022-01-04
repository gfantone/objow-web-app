import { call, put, takeLatest } from 'redux-saga/effects'
import { countTeamRewardOrderSuccess, countTeamRewardOrderError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* countTeamRewardOrder(action) {
    try {
        const {data: orders} = yield call(api.teamRewardOrders.waitingCount);
        yield put(countTeamRewardOrderSuccess(orders))
    } catch(e) {
        yield put(countTeamRewardOrderError())
    }
}

function* watchWaitingTeamRewardOrderCount() {
    yield takeLatest(types.COUNT_WAITING_TEAM_REWARD_ORDER, countTeamRewardOrder)
}

export default watchWaitingTeamRewardOrderCount
