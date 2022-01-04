import { all, call, put, takeLatest } from 'redux-saga/effects'
import {updateTeamGoalListSuccess, updateTeamGoalListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateTeamGoalList(action) {
    try {
        yield call(api.teamGoals.bulkUpdate, action.goals);
        yield put(updateTeamGoalListSuccess())
    } catch(e) {
        yield put(updateTeamGoalListError())
    }
}

function* watchTeamGoalListUpdate() {
    yield takeLatest(types.UPDATE_TEAM_GOAL_LIST, updateTeamGoalList)
}

export default watchTeamGoalListUpdate