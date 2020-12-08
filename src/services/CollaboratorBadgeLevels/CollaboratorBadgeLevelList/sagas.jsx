import {all, call, put, takeEvery} from 'redux-saga/effects'
import {getCollaboratorBadgeLevelListSuccess, getCollaboratorBadgeLevelListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorBadgeLevelList(action) {
    try {
        var {data: levels} = yield call(api.collaborators.badges, action.collaboratorId, action.year)
        const collaboratorList = yield all(levels.map(level => call(api.collaboratorBadgeSummary.collaborators, level.id)));
        levels.map(level => {
            var index = levels.indexOf(level);
            level.collaborators = collaboratorList[index].data
        })
        yield put(getCollaboratorBadgeLevelListSuccess(levels))
    } catch(e) {
        yield put(getCollaboratorBadgeLevelListError())
    }
}

function* getCollaboratorNextBadgeLevelList(action) {
    try {
        var {data: levels} = yield call(api.collaborators.nextBagdes, action.collaboratorId, action.year)
        const collaboratorList = yield all(levels.map(level => call(api.collaboratorBadgeSummary.collaborators, level.id)));
        levels.map(level => {
            var index = levels.indexOf(level);
            level.collaborators = collaboratorList[index].data
        })
        yield put(getCollaboratorBadgeLevelListSuccess(levels))
    } catch(e) {
        yield put(getCollaboratorBadgeLevelListError())
    }
}

export function* watchCollaboratorBadgeLevelList() {
    yield takeEvery(types.GET_COLLABORATOR_BADGE_LEVEL_LIST, getCollaboratorBadgeLevelList)
}

export function* watchCollaboratorNextBadgeLevelList() {
    yield takeEvery(types.GET_COLLABORATOR_NEXT_BADGE_LEVEL_LIST, getCollaboratorNextBadgeLevelList)
}
