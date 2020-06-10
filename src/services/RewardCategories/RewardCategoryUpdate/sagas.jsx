import {call, put, takeEvery} from 'redux-saga/effects'
import {updateRewardCategorySuccess, updateRewardCategoryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* updateRewardCategory(action) {
    try {
        yield call(api.rewardCategories.update, action.category)
        yield put(updateRewardCategorySuccess())
    } catch(e) {
        yield put(updateRewardCategoryError())
    }
}

function* updateRewardCategoryActivation(action) {
    try {
        yield call(api.rewardCategories.updateActivation, action.id, action.isActive)
        yield put(updateRewardCategorySuccess())
    } catch(e) {
        yield put(updateRewardCategoryError())
    }
}

export function* watchRewardCategoryUpdate() {
    yield takeEvery(types.UPDATE_REWARD_CATEGORY, updateRewardCategory)
}

export function* watchRewardCategoryActivationUpdate() {
    yield takeEvery(types.UPDATE_REWARD_CATEGORY_ACTIVATION, updateRewardCategoryActivation)
}
