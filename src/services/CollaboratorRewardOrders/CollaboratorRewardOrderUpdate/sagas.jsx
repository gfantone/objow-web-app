import {call, put, takeEvery} from 'redux-saga/effects'
import {updateCollaboratorRewardOrderSuccess, updateCollaboratorRewardOrderError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateCollaboratorRewardOrderValidation(action) {
    try {
        call(api.collaboratorRewardOrders.updateValidation, action.id, action.isValid)
        yield put(updateCollaboratorRewardOrderSuccess())
    } catch(e) {
        yield put(updateCollaboratorRewardOrderError())
    }
}

function* watchCollaboratorRewardOrderValidationUpdate() {
    yield takeEvery(types.UPDATE_COLLABORATOR_REWARD_ORDER_VALIDATION, updateCollaboratorRewardOrderValidation)
}

export default watchCollaboratorRewardOrderValidationUpdate
