import { call, put, takeEvery } from 'redux-saga/effects'
import { getCollaboratorListSuccess, getCollaboratorListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getFreeCollaboratorList(action) {
    try {
        const { data: collaborators } = yield call(api.collaborators.free)
        yield put(getCollaboratorListSuccess(collaborators))
    } catch(e) {
        yield put(getCollaboratorListError())
    }
}

function* watchFreeCollaboratorList() {
    yield takeEvery(types.GET_FREE_COLLABORATOR_LIST, getFreeCollaboratorList)
}

export default watchFreeCollaboratorList