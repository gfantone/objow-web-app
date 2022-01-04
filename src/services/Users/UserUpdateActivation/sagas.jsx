import { call, put, takeLatest } from 'redux-saga/effects'
import { updateUserActivationSuccess, updateUserActivationError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateUserActivation(action) {
    try {
        yield call(api.users.updateActivation, action.user.id, !action.user.isActive);
        yield put(updateUserActivationSuccess())
    } catch(e) {
        yield put(updateUserActivationError())
    }
}

function* watchUserUpdateActivation() {
    yield takeLatest(types.UPDATE_USER_ACTIVATION, updateUserActivation)
}

export default watchUserUpdateActivation