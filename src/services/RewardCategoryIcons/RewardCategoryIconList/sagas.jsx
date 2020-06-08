import {call, put, takeEvery} from 'redux-saga/effects'
import {getRewardCategoryIconListSuccess, getRewardCategoryIconListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getRewardCategoryIconList(action) {
    try {
        const { data: icons } = yield call(api.rewardCategoryIcons.list)
        yield put(getRewardCategoryIconListSuccess(icons))
    } catch(e) {
        yield put(getRewardCategoryIconListError())
    }
}

function* watchRewardCategoryIconList() {
    yield takeEvery(types.GET_REWARD_CATEGORY_ICON_LIST_ERROR, getRewardCategoryIconList)
}

export default watchRewardCategoryIconList
