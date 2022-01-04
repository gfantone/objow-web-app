import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserListSuccess, getUserListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUserList(action) {
    try {
        const { data: users } = yield call(api.users.list, action.isActive);
        yield put(getUserListSuccess(users))
    } catch(e) {
        yield put(getUserListError())
    }
}

function* watchUserList() {
    yield takeLatest(types.GET_USER_LIST, getUserList)
}

export default watchUserList