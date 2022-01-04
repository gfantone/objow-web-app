import { call, put, takeLatest } from 'redux-saga/effects'
import { getCategoryIconListSuccess, getCategoryIconListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUsableList(action) {
    try {
        let { data: icons } = yield call(api.categoryIcons.usable);
        yield put(getCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getCategoryIconListError())
    }
}

function* getUsableListForCategory(action) {
    try {
        let { data: icons } = yield call(api.categories.usableIcons, action.categoryId);
        yield put(getCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getCategoryIconListError())
    }
}

export function* watchUsableCategoryIconList() {
    yield takeLatest(types.GET_USABLE_LIST, getUsableList)
}

export function* watchUsableCategoryIconListForCategory() {
    yield takeLatest(types.GET_USABLE_LIST_FOR_CATEGORY, getUsableListForCategory)
}
