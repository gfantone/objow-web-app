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

function* watchRewardCategoryUpdate() {
    yield takeEvery(types.UPDATE_REWARD_CATEGORY, updateRewardCategory)
}

export default watchRewardCategoryUpdate
