import {all, call, put, takeEvery} from 'redux-saga/effects'
import {getGoalDefinitionListSuccess, getGoalDefinitionListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getGoalDefinitions(action) {
    try {
        var { data: definitions } = yield call(api.periods.goalDefinitions, action.periodId, action.isActive);
        if (action.includeData) {
            const levelCountList = yield all(definitions.map(definition => call(api.goalDefinitions.levelCount, definition.id)));
            const pointList = yield all(definitions.map(definition => call(api.goalDefinitions.points, definition.id)));
            const obtainedPointList = yield all(definitions.map(definition => call(api.goalDefinitions.obtainedPoints, definition.id)));
            definitions.map(definition => {
                const index = definitions.indexOf(definition);
                definition.levels = levelCountList[index].data;
                definition.points = pointList[index].data;
                definition.obtainedPoints = obtainedPointList[index].data
            })
        }
        yield put(getGoalDefinitionListSuccess(definitions))
    } catch(e) {
        yield put(getGoalDefinitionListError())
    }
}

function* getAllGoalDefinitions(action) {
    try {
        const {data: definitions} = yield call(api.goalDefinitions.list)
        yield put(getGoalDefinitionListSuccess(definitions))
    } catch(e) {
        yield put(getGoalDefinitionListError())
    }
}

export function* watchGoalDefinitionList() {
    yield takeEvery(types.GET_GOAL_DEFINITION_LIST, getGoalDefinitions)
}

export function* watchAllGoalDefinitionList() {
    yield takeEvery(types.GET_ALL_GOAL_DEFINITION_LIST, getAllGoalDefinitions)
}
