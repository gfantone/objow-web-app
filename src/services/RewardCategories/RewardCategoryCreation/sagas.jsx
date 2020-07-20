import {call, put, takeEvery} from 'redux-saga/effects'
import {createRewardCategorySuccess, createRewardCategoryError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createRewardCategory(action) {
    try {
        yield call(api.rewardCategories.create, action.category)
        yield put(createRewardCategorySuccess())
    } catch(e) {
        yield put(createRewardCategoryError())
    }
}

function* watchRewardCategoryCreation() {
    yield takeEvery(types.CREATE_REWARD_CATEGORY, createRewardCategory)
}

export default watchRewardCategoryCreation
