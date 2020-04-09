import { call, put, takeEvery } from 'redux-saga/effects'
import { getTeamGoalCategoryListSuccess, getTeamGoalCategoryListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getTeamGoalCategories(action) {
    try {
        const { data: categories } = yield call(api.teams.goalCategories, action.id, action.year);
        yield put(getTeamGoalCategoryListSuccess(categories))
    } catch(e) {
        yield put(getTeamGoalCategoryListError())
    }
}

function* watchTeamGoalCategoryList() {
    yield takeEvery(types.GET_TEAM_GOAL_CATEGORY_LIST, getTeamGoalCategories)
}

export default watchTeamGoalCategoryList
