import { call, put, takeEvery } from 'redux-saga/effects'
import { getChallengeTypeUsablePointsSuccess, getChallengeTypeUsablePointsError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getChallengeTypeUsablePoints(action) {
    try {
        const { data: points } = yield call(api.challengeTypes.usablePoints, action.id, action.start, action.end, action.teamId);
        yield put(getChallengeTypeUsablePointsSuccess(points))
    } catch(e) {
        yield put(getChallengeTypeUsablePointsError())
    }
}

function* getChallengeTypeUsablePointsByChallenge(action) {
    try {
        const { data: points } = yield call(api.challenges.usablePoints, action.challengeId, action.start, action.end);
        yield put(getChallengeTypeUsablePointsSuccess(points))
    } catch(e) {
        yield put(getChallengeTypeUsablePointsError())
    }
}

export function* watchChallengeTypeUsablePoints() {
    yield takeEvery(actionTypes.GET_CHALLENGE_TYPE_USABLE_POINTS, getChallengeTypeUsablePoints)
}

export function* watchChallengeTypeUsablePointsByChallenge() {
    yield takeEvery(actionTypes.GET_CHALLENGE_TYPE_USABLE_POINTS_BY_CHALLENGE, getChallengeTypeUsablePointsByChallenge)
}