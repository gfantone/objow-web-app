import { call, put, takeLatest } from 'redux-saga/effects';
import { getPartnerSuccess, getPartnerError } from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getPartner(action) {
  try {
    const { data: partner } = yield call(api.partners.detail, action.id);
    yield put(getPartnerSuccess(partner));
  } catch (e) {
    yield put(getPartnerError());
  }
}

function* watchPartnerDetail() {
  yield takeLatest(types.GET_PARTNER, getPartner);
}

export default watchPartnerDetail;
