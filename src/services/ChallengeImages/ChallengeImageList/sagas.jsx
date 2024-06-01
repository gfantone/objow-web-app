import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getChallengeImageListSuccess,
  getChallengeImageListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getChallengeImageList(action) {
  try {
    var { data: images } = yield call(api.challengeImages.list);
    yield put(getChallengeImageListSuccess(images));
  } catch (e) {
    yield put(getChallengeImageListError());
  }
}

function* watchChallengeImageList() {
  yield takeLatest(types.GET_CHALLENGE_IMAGE_LIST, getChallengeImageList);
}

export default watchChallengeImageList;
