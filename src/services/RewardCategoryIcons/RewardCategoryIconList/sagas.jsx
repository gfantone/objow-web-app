import {call, put, takeEvery} from 'redux-saga/effects'
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

function* watchUsableRewardCategoryIconList() {
    yield takeEvery(types.GET_USABLE_REWARD_CATEGORY_ICON_LIST, getUsableRewardCategoryIconList)
}

export default watchUsableRewardCategoryIconList
