import {call, put, takeEvery} from 'redux-saga/effects'
import {updateTeamRewardOrderSuccess, updateTeamRewardOrderError} from './actions'
import {countTeamRewardOrderSuccess} from '../TeamRewardOrderCount/actions'
import {clearTeamRewardOrderDetail} from '../TeamRewardOrderDetail/actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateTeamRewardOrder(action) {
    try {
        yield call(api.teamRewardOrders.update, action.id, action.oldPointBalance, action.isValid)
        const {data: orders} = yield call(api.teamRewardOrders.waitingCount)
        yield put(updateTeamRewardOrderSuccess())
        yield put(countTeamRewardOrderSuccess(orders))
        yield put(clearTeamRewardOrderDetail())
    } catch(e) {
        yield put(updateTeamRewardOrderError())
    }
}

function* watchTeamRewardOrderUpdate() {
    yield takeEvery(types.UPDATE_TEAM_REWARD_ORDER, updateTeamRewardOrder)
}

export default watchTeamRewardOrderUpdate
