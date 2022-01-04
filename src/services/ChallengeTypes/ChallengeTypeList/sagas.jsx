import { call, put, takeLatest } from 'redux-saga/effects'
import { getChallengeTypeListSuccess, getChallengeTypeListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* getChallengeTypeList(action) {
    try {
        const { data: types } = yield call(api.periods.challengeTypes, action.periodId);
        yield put(getChallengeTypeListSuccess(types))
    } catch(e) {
        yield put(getChallengeTypeListError())
    }
}

function* getCurrentChallengeTypeList(action) {
    try {
        const { data: types } = yield call(api.challengeTypes.current);
        yield put(getChallengeTypeListSuccess(types))
    } catch(e) {
        yield put(getChallengeTypeListError())
    }
}

function* getUsableChallengeTypeList(action) {
    try {
        const { data: types } = yield call(api.challengeTypes.usable);
        yield put(getChallengeTypeListSuccess(types))
    } catch(e) {
        yield put(getChallengeTypeListError())
    }
}

export function* watchChallengeTypeList() {
    yield takeLatest(actionTypes.GET_CHALLENGE_TYPE_LIST, getChallengeTypeList)
}

export function* watchCurrentChallengeTypeList() {
    yield takeLatest(actionTypes.GET_CURRENT_CHALLENGE_TYPE_LIST, getCurrentChallengeTypeList)
}

export function* watchUsableChallengeTypeList() {
    yield takeLatest(actionTypes.GET_USABLE_CHALLENGE_TYPE_LIST, getUsableChallengeTypeList)
}