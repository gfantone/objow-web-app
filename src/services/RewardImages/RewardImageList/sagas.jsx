import {call, put, takeLatest} from 'redux-saga/effects'
import {getRewardImageListSuccess, getRewardImageListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getRewardImageList(action) {
    try {
        const {data: images} = yield call(api.rewardImages.list)
        yield put(getRewardImageListSuccess(images))
    } catch(e) {
        yield put(getRewardImageListError())
    }
}

function* watchRewardImageList() {
    yield takeLatest(types.GET_REWARD_IMAGE_LIST, getRewardImageList)
}

export default watchRewardImageList
