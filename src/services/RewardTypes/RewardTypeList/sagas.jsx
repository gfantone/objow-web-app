import {call, put, takeEvery} from 'redux-saga/effects'
import {getRewardTypeListSuccess, getRewardTypeListError} from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getRewardTypeList(action) {
    try {
        const {data: types} = yield call(api.rewardTypes.list)
        yield put(getRewardTypeListSuccess(types))
    } catch(e) {
        yield put(getRewardTypeListError())
    }
}

function* watchRewardTypeList() {
    yield takeEvery(actionTypes.GET_REWARD_TYPE_LIST, getRewardTypeList)
}

export default watchRewardTypeList
