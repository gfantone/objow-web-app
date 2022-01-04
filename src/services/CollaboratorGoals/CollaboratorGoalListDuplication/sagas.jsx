import {call, put, takeLatest} from 'redux-saga/effects'
import {duplicateCollaboratorGoalListSuccess, duplicateCollaboratorGoalListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* duplicateCollaboratorGoalList(action) {
    try {
        yield call(api.collaboratorGoals.duplicate, action.source, action.destination)
        yield put(duplicateCollaboratorGoalListSuccess())
    } catch(e) {
        yield put(duplicateCollaboratorGoalListError())
    }
}

function* watchCollaboratorGoalListDuplication() {
    yield takeLatest(types.DUPLICATE_COLLABORATOR_GOAL_LIST, duplicateCollaboratorGoalList)
}

export default watchCollaboratorGoalListDuplication
