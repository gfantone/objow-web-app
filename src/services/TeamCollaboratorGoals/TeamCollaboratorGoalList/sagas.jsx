import { all, call, put, takeEvery } from 'redux-saga/effects'
import { getTeamCollaboratorGoalListSuccess, getTeamCollaboratorGoalListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamCollaboratorGoalList(action) {
    try {
        const { data: goals } = yield call(api.teams.collaboratorGoals, action.teamId, action.current, action.category, action.year, action.start, action.end, action.name);
        yield put(getTeamCollaboratorGoalListSuccess(goals))
    } catch(e) {
        yield put(getTeamCollaboratorGoalListError())
    }
}

function* watchTeamCollaboratorGoalList() {
    yield takeEvery(types.GET_TEAM_COLLABORATOR_GOAL_LIST, getTeamCollaboratorGoalList)
}

export default watchTeamCollaboratorGoalList
