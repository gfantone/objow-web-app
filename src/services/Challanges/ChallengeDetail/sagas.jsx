import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getChallengeDetailSuccess, getChallengeDetailError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getChallengeDetail(action) {
    try {
        const [{ data: challenge }, { data: awards }, { data: goals }] = yield all([
            call(api.challenges.detail, action.id),
            call(api.challenges.awards, action.id),
            call(api.challenges.goals, action.id)
        ]);
        challenge.awards = awards;
        challenge.goals = goals;
        yield put(getChallengeDetailSuccess(challenge))
    } catch(e) {
        yield put(getChallengeDetailError())
    }
}

function* watchChallengeDetail() {
    yield takeLatest(types.GET_CHALLENGE_DETAIL, getChallengeDetail)
}

export default watchChallengeDetail