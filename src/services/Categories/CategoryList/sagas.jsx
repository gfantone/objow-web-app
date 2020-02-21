import { call, put, takeEvery } from 'redux-saga/effects'
import {getCategoryListSuccess, getCategoryListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCategoryList(action) {
    try {
        let {data: categories} = yield call(api.categories.list)
        yield put(getCategoryListSuccess(categories))
    } catch(e) {
        yield put(getCategoryListError())
    }
}

function* watchCategoryList() {
    yield takeEvery(types.GET_CATEGORY_LIST, getCategoryList)
}

export default watchCategoryList