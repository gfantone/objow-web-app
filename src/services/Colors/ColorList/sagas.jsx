import { call, put, takeLatest } from 'redux-saga/effects'
import { getColorListSuccess, getColorListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getFreeColorList(action) {
    try {
        const { data: colors } = yield call(api.teams.freeColors)
        yield put(getColorListSuccess(colors))
    } catch(e) {
        yield put(getColorListError())
    }
}

function* watchFreeColorList() {
    yield takeLatest(types.GET_FREE_COLOR_LIST, getFreeColorList)
}

export default watchFreeColorList