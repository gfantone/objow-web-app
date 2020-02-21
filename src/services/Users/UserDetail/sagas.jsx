import { call, put, takeEvery } from 'redux-saga/effects'
import {getUserDetailSuccess, getUserDetailError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUserDetail(action) {
    try {
        const {data: user} = yield call(api.users.detail, action.id)
        yield put(getUserDetailSuccess(user))
    } catch(e) {
        yield put(getUserDetailError())
    }
}

function* watchUserDetail() {
    yield takeEvery(types.GET_USER_DETAIL, getUserDetail)
}

export default watchUserDetail