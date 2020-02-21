import { all, call, put, takeEvery } from 'redux-saga/effects'
import { getCollaboratorDetailSuccess, getCollaboratorDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorDetail(action) {
    try {
        var [{ data: collaborator }, { data: generalRank }, { data: nextLevel }, { data: collaborators }] = yield all([
            call(api.collaborators.detail, action.id),
            call(api.collaborators.generalRank, action.id, action.year),
            call(api.collaborators.nextLevel, action.id, action.year),
            call(api.collaborators.count)
        ]);
        collaborator.generalRank = generalRank;
        collaborator.nextLevel = nextLevel;
        collaborator.collaborators = collaborators;
        yield put(getCollaboratorDetailSuccess(collaborator))
    } catch(e) {
        yield put(getCollaboratorDetailError())
    }
}

function* watchCollaboratorDetail() {
    yield takeEvery(types.GET_COLLABORATOR_DETAIL, getCollaboratorDetail)
}

export default watchCollaboratorDetail