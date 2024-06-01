import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getUserIdentifierDefinitionListSuccess,
  getUserIdentifierDefinitionListError,
} from './actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* getUserIdentifierDefinitionList(action) {
  try {
    const { data: result } = yield call(api.userIdentifiers.definitions);
    yield put(getUserIdentifierDefinitionListSuccess(result));
  } catch (e) {
    yield put(getUserIdentifierDefinitionListError());
  }
}

function* watchUserIdentifierDefinitionList() {
  yield takeLatest(
    types.GET_USER_IDENTIFIER_LIST,
    getUserIdentifierDefinitionList
  );
}

export default watchUserIdentifierDefinitionList;
