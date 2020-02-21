import { call, put, takeEvery } from 'redux-saga/effects'
import { getSystemImageListSuccess, getSystemImageListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getSystemImageList(action) {
    try {
        const { data: images } = yield call(api.systemImages.list)
        yield put(getSystemImageListSuccess(images))
    } catch(e) {
        yield put(getSystemImageListError())
    }
}

function* watchSystemImageList() {
    yield takeEvery(types.GET_SYSTEM_IMAGE_LIST, getSystemImageList)
}

export default watchSystemImageList