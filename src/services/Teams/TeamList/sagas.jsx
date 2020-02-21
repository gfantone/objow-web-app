import { all, call, put, takeEvery } from 'redux-saga/effects'
import { getTeamListSuccess, getTeamListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamList(action) {
    try {
        var { data: teams } = yield call(api.teams.list);
        const collaboratorList = yield all(teams.map(team => call(api.teams.collaborators, team.id)));
        teams.map(team => {
            var index = teams.indexOf(team);
            team.collaborators = collaboratorList[index].data
        });
        yield put(getTeamListSuccess(teams))
    } catch(e) {
        yield put(getTeamListError())
    }
}

function* watchTeamList() {
    yield takeEvery(types.GET_TEAM_LIST, getTeamList)
}

export default watchTeamList