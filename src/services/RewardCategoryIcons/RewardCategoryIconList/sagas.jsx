import {call, put, takeLatest} from 'redux-saga/effects'
import {getRewardCategoryIconListSuccess, getRewardCategoryIconListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUsableRewardCategoryIconList(action) {
    try {
        const { data: icons } = yield call(api.rewardCategoryIcons.usable)
        yield put(getRewardCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getRewardCategoryIconListError())
    }
}

function* getUsableRewardCategoryIconListForRewardCategory(action) {
    try {
        const { data: icons } = yield call(api.rewardCategories.usableIcons, action.categoryId)
        yield put(getRewardCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getRewardCategoryIconListError())
    }
}

export function* watchUsableRewardCategoryIconList() {
    yield takeLatest(types.GET_USABLE_REWARD_CATEGORY_ICON_LIST, getUsableRewardCategoryIconList)
}

export function* watchUsableRewardCategoryIconListForRewardCategory() {
    yield takeLatest(types.GET_USABLE_REWARD_CATEGORY_ICON_LIST_FOR_REWARD_CATEGORY, getUsableRewardCategoryIconListForRewardCategory)
}
