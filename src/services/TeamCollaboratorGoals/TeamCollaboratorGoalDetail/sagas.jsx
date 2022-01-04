import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getTeamCollaboratorGoalDetailSuccess, getTeamCollaboratorGoalDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCollaboratorGoalDetail(action) {
    try {
        var [
            { data: goal },
            { data: levels },
            { data: definition },
            { data: advices }
        ] = yield all([
            call(api.teamCollaboratorGoalSummaries.detail, action.id),
            call(api.teamCollaboratorGoals.levels, action.id),
            call(api.teamCollaboratorGoals.definition, action.id),
            call(api.teamCollaboratorGoals.advices, action.id),
        ]);
        goal.levels = levels;
        goal.definition = definition;
        goal.advices = advices;
        yield put(getTeamCollaboratorGoalDetailSuccess(goal))
    } catch(e) {
        yield put(getTeamCollaboratorGoalDetailError())
    }
}

function* watchTeamCollaboratorGoalDetail() {
    yield takeLatest(types.GET_TEAM_COLLABORATOR_GOAL_DETAIL, getTeamCollaboratorGoalDetail)
}

export default watchTeamCollaboratorGoalDetail
