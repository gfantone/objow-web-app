import { call, put, takeLatest } from 'redux-saga/effects'
import { getLevelDetailSuccess, getLevelDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getLevelDetail(action) {
    try {
        let { data: category } = yield call(api.levels.detail, action.id);
        yield put(getLevelDetailSuccess(category))
    } catch(e) {
        yield put(getLevelDetailError())
    }
}

function* watchLevelDetail() {
    yield takeLatest(types.GET_LEVEL_DETAIL, getLevelDetail)
}

export default watchLevelDetail
