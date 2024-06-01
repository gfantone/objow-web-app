import { call, put, takeLatest } from 'redux-saga/effects';
import { updateSystemImageSuccess, updateSystemImageError } from './actions';
import { getSystemImageListSuccess } from '../SystemImageList/actions';
import * as types from './actionTypes';
import api from '../../../data/api/api';

function* updateSystemImage(action) {
  try {
    yield call(api.systemImages.update, action.code, action.image);
    const { data: images } = yield call(api.systemImages.list);
    yield put(updateSystemImageSuccess());
    yield put(getSystemImageListSuccess(images));
  } catch (e) {
    yield put(updateSystemImageError());
  }
}

function* watchSystemImageUpdate() {
  yield takeLatest(types.UPDATE_SYSTEM_IMAGE, updateSystemImage);
}

export default watchSystemImageUpdate;
