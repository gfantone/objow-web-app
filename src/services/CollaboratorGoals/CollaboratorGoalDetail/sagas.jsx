import { all, call, put, takeEvery } from 'redux-saga/effects'
import { getCollaboratorGoalDetailSuccess, getCollaboratorGoalDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorGoalDetail(action) {
    try {
        var [
            { data: goal },
            { data: levels },
            { data: definition },
            { data: advices }
        ] = yield all([
            call(api.collaboratorGoalSummaries.detail, action.id),
            call(api.collaboratorGoals.levels, action.id),
            call(api.collaboratorGoals.definition, action.id),
            call(api.collaboratorGoals.advices, action.id),
        ]);
        goal.levels = levels;
        goal.definition = definition;
        goal.advices = advices;
        yield put(getCollaboratorGoalDetailSuccess(goal))
    } catch(e) {
        yield put(getCollaboratorGoalDetailError())
    }
}

function* watchCollaboratorGoalDetail() {
    yield takeEvery(types.GET_COLLABORATOR_GOAL_DETAIL, getCollaboratorGoalDetail)
}

export default watchCollaboratorGoalDetail
