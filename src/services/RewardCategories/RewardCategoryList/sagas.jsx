import {call, put, takeEvery} from 'redux-saga/effects'
import {getRewardCategoryListSuccess, getRewardCategoryListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getActiveRewardCategoryList(action) {
    try {
        yield call(api.rewardCategories.actives)
        yield put(getRewardCategoryListSuccess())
    } catch(e) {
        yield put(getRewardCategoryListError())
    }
}

function* getInactiveRewardCategoryList(action) {
    try {
        yield call(api.rewardCategories.inactives)
        yield put(getRewardCategoryListSuccess())
    } catch(e) {
        yield put(getRewardCategoryListError())
    }
}

export function* watchActiveRewardCategoryList() {
    yield takeEvery(types.GET_ACTIVE_REWARD_CATEGORY_LIST, getActiveRewardCategoryList)
}

export function* watchInactiveRewardCategoryList() {
    yield takeEvery(types.GET_INACTIVE_REWARD_CATEGORY_LIST, getInactiveRewardCategoryList)
}
