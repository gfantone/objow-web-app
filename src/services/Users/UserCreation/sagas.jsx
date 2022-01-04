import { call, put, takeLatest } from 'redux-saga/effects'
import { createUserSuccess, createUserError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createUser(action) {
    try {
        yield call(api.users.create, action.user)
        yield put(createUserSuccess())
    } catch(e) {
        yield put(createUserError())
    }
}

function* watchUserCreation() {
    yield takeLatest(types.CREATE_USER, createUser)
}

export default watchUserCreation