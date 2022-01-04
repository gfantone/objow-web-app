import {all, call, put, takeLatest} from 'redux-saga/effects'
import {getCollaboratorRewardOrderSuccess, getCollaboratorRewardOrderError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorRewardOrder(action) {
    try {
        var [{data: order}, {data: items}] = yield all([
            call(api.collaboratorRewardOrders.detail, action.id),
            call(api.collaboratorRewardOrders.items, action.id)
        ])
        if (action.withPointSummary) {
            const {data: pointSummary} = yield call(api.collaborators.collaboratorPointSummary, order.counter.collaborator.id, order.counter.period.id)
            order.pointSummary = pointSummary
        }
        order.items = items
        yield put(getCollaboratorRewardOrderSuccess(order))
    } catch(e) {
        yield put(getCollaboratorRewardOrderError())
    }
}

function* watchCollaboratorRewardOrderDetail() {
    yield takeLatest(types.GET_COLLABORATOR_REWARD_ORDER, getCollaboratorRewardOrder)
}

export default watchCollaboratorRewardOrderDetail
