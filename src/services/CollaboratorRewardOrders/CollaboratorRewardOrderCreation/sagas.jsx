import {all, call, put, takeLatest} from 'redux-saga/effects'
import {createCollaboratorRewardOrderSuccess, createCollaboratorRewardOrderError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createCollaboratorRewardOrder(action) {
    try {
        const {data: order} = yield call(api.collaboratorRewardOrders.create, action.order)
        action.items.map(item => item.order = order.id)
        yield all(action.items.map(item => call(api.collaboratorRewardOrderItems.create, item)))
        yield put(createCollaboratorRewardOrderSuccess())
    } catch(e) {
        yield put(createCollaboratorRewardOrderError())
    }
}

function* watchCollaboratorRewardOrderCreation() {
    yield takeLatest(types.CREATE_COLLABORATOR_REWARD_ORDER, createCollaboratorRewardOrder)
}

export default watchCollaboratorRewardOrderCreation
