import { call, put, takeEvery } from 'redux-saga/effects'
import { getChallengeAwardTypeListSuccess, getChallengeAwardTypeListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getChallengeAwardTypeList(action) {
    try {
        var { data: types } = yield call(api.challengeAwardTypes.list);
        yield put(getChallengeAwardTypeListSuccess(types))
    } catch(e) {
        yield put(getChallengeAwardTypeListError())
    }
}

function* watchChallengeAwardTypeList() {
    yield takeEvery(actionTypes.GET_CHALLENGE_AWARD_TYPE_LIST, getChallengeAwardTypeList)
}

export default watchChallengeAwardTypeList