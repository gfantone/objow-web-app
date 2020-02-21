import { call, put, takeEvery } from 'redux-saga/effects'
import { updateUserSuccess, updateUserError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateUser(action) {
    try {
        yield call(api.users.update, action.user)
        yield put(updateUserSuccess())
    } catch(e) {
        yield put(updateUserError())
    }
}

function* watchUserUpdate() {
    yield takeEvery(types.UPDATE_USER, updateUser)
}

export default watchUserUpdate