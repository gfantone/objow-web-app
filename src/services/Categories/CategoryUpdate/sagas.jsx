import { call, put, takeLatest } from 'redux-saga/effects'
import { updateCategorySuccess, updateCategoryError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateCategory(action) {
    try {
        yield call(api.categories.update, action.category);
        yield put(updateCategorySuccess())
    } catch(e) {
        yield put(updateCategoryError())
    }
}

function* watchCategoryUpdate() {
    yield takeLatest(types.UPDATE_CATEGORY, updateCategory)
}

export default watchCategoryUpdate
