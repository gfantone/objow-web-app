import {all, call, put, takeEvery} from 'redux-saga/effects'
import {getTeamRewardOrderSuccess, getTeamRewardOrderError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamRewardOrder(action) {
    try {
        var [{data: order}, {data: items}] = yield all([
            call(api.teamRewardOrders.detail, action.id),
            call(api.teamRewardOrders.items, action.id)
        ])
        order.items = items
        yield put(getTeamRewardOrderSuccess(order))
    } catch(e) {
        yield put(getTeamRewardOrderError())
    }
}

function* watchTeamRewardOrderDetail() {
    yield takeEvery(types.GET_TEAM_REWARD_ORDER, getTeamRewardOrder)
}

export default watchTeamRewardOrderDetail
