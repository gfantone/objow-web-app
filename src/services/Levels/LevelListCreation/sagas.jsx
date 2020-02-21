import { call, put, takeEvery } from 'redux-saga/effects'
import { createLevelListSuccess, createLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createLevelList(action) {
    try {
        for (var i = 0; i < action.levels.length; i++) {
            const level = action.levels[i];
            yield call(api.levels.create, level.points, level.period)
        }
        yield put(createLevelListSuccess())
    } catch(e) {
        yield put(createLevelListError())
    }
}

function* watchLevelListCreation() {
    yield takeEvery(types.CREATE_LEVEL_LIST, createLevelList)
}

export default watchLevelListCreation