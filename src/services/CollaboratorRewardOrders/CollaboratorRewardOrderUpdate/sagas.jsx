import {call, put, takeEvery} from 'redux-saga/effects'
import {updateCollaboratorRewardOrderSuccess, updateCollaboratorRewardOrderError} from './actions'
import {clearCollaboratorRewardOrderDetail} from '../CollaboratorRewardOrderDetail/actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateCollaboratorRewardOrderValidation(action) {
    try {
        yield call(api.collaboratorRewardOrders.update, action.id, action.oldPointBalance, action.isValid)
        yield put(updateCollaboratorRewardOrderSuccess())
        yield put(clearCollaboratorRewardOrderDetail())
    } catch(e) {
        yield put(updateCollaboratorRewardOrderError())
    }
}

function* watchCollaboratorRewardOrderValidationUpdate() {
    yield takeEvery(types.UPDATE_COLLABORATOR_REWARD_ORDER, updateCollaboratorRewardOrderValidation)
}

export default watchCollaboratorRewardOrderValidationUpdate
