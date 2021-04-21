import {call, put, takeEvery} from 'redux-saga/effects'
import {exportUserListSuccess, exportUserListError} from './actions'
import {getUserListSuccess} from '../UserList/actions'
import * as types from './actionTypes'
import * as errors from './errorTypes'
import api from '../../../data/api/api'

function* exportUserList(action) {
    try {
        yield call(api.users.export, action.request);
        yield put(exportUserListSuccess())
    } catch(e) {
        if (e && e.response && e.response.status === 400) {
            yield put(exportUserListError(errors.BAD_REQUEST_ERROR))
        } else {
            yield put(exportUserListError(errors.UNKNOWN_ERROR))
        }
    } finally {
        const {data: users} = yield call(api.users.list);
        yield put(getUserListSuccess(users))
    }
}

function* watchUserListExport() {
    yield takeEvery(types.EXPORT_USER_LIST, exportUserList)
}

export default watchUserListExport
