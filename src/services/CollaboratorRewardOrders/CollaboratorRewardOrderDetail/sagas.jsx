import {all, call, put, takeEvery} from 'redux-saga/effects'
import {getCollaboratorRewardOrderSuccess, getCollaboratorRewardOrderError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorRewardOrder(action) {
    try {
        var [{data: order}, {date: items}] = yield all([
            call(api.collaboratorRewardOrders.detail, action.id),
            call(api.collaboratorRewardOrders.items, action.id)
        ])
        order.items = items
        yield put(getCollaboratorRewardOrderSuccess(order))
    } catch(e) {
        yield put(getCollaboratorRewardOrderError())
    }
}

function* watchCollaboratorRewardOrderDetail() {
    yield takeEvery(types.GET_COLLABORATOR_REWARD_ORDER, getCollaboratorRewardOrder)
}

export default watchCollaboratorRewardOrderDetail
