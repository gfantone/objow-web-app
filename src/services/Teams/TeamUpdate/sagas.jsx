import { all, call, put, takeLatest } from 'redux-saga/effects'
import { updateTeamSuccess, updateTeamError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateTeam(action) {
    try {
        const { data: team } = yield call(api.teams.update, action.team);
        yield all(action.oldCollaborators.map(collaborator => call(api.users.updateTeam, collaborator.id, null)));
        yield all(action.newCollaborators.map(collaborator => call(api.users.updateTeam, collaborator.id, team.id)));
        yield put(updateTeamSuccess())
    } catch(e) {
        yield put(updateTeamError())
    }
}

function* watchTeamUpdate() {
    yield takeLatest(types.UPDATE_TEAM, updateTeam)
}

export default watchTeamUpdate