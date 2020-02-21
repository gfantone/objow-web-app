import { call, put, takeEvery } from 'redux-saga/effects'
import { updateUserPasswordSuccess, updateUserPasswordError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateUserPassword(action) {
    try {
        yield call(api.users.updatePassword, action.id, action.password)
        yield put(updateUserPasswordSuccess())
    } catch(e) {
        yield put(updateUserPasswordError())
    }
}

function* watchUserUpdatePassword() {
    yield takeEvery(types.UPDATE_USER_PASSWORD, updateUserPassword)
}

export default watchUserUpdatePassword