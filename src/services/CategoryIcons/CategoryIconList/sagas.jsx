import { call, put, takeEvery } from 'redux-saga/effects'
import { getCategoryIconListSuccess, getCategoryIconListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCategoryIconList(action) {
    try {
        let { data: icons } = yield call(api.categoryIcons.list);
        yield put(getCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getCategoryIconListError())
    }
}

function* getUnusedCategoryIconList(action) {
    try {
        let { data: icons } = yield call(api.categoryIcons.unused);
        yield put(getCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getCategoryIconListError())
    }
}

export function* watchCategoryIconList() {
    yield takeEvery(types.GET_CATEGORY_ICON_LIST, getCategoryIconList)
}

export function* watchUnusedCategoryIconList() {
    yield takeEvery(types.GET_UNUSED_CATEGORY_ICON_LIST, getUnusedCategoryIconList)
}
