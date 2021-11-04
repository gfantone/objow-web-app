import { call, put, takeEvery } from 'redux-saga/effects'
import { getChallengeRewardTypeListSuccess, getChallengeRewardTypeListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getChallengeRewardTypeList(action) {
    try {
        var { data: types } = yield call(api.challengeRewardTypes.list);
        yield put(getChallengeRewardTypeListSuccess(types))
    } catch(e) {
        yield put(getChallengeRewardTypeListError())
    }
}

function* watchChallengeRewardTypeList() {
    yield takeEvery(actionTypes.GET_CHALLENGE_REWARD_TYPE_LIST, getChallengeRewardTypeList)
}

export default watchChallengeRewardTypeList
