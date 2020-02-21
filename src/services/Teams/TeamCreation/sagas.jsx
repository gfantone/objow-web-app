import { all, call, put, takeEvery } from 'redux-saga/effects'
import { createTeamSuccess, createTeamError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createTeam(action) {
    try {
        const { data: team } = yield call(api.teams.create, action.team);
        yield all(action.collaborators.map(collaborator => call(api.users.updateTeam, collaborator.id, team.id)));
        yield put(createTeamSuccess())
    } catch(e) {
        yield put(createTeamError())
    }
}

function* watchTeamCreation() {
    yield takeEvery(types.CREATE_TEAM, createTeam)
}

export default watchTeamCreation