import { call, put, takeEvery } from 'redux-saga/effects'
import { removeCoachingItemSuccess, removeCoachingItemError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* removeCoachingItem(action) {
    try {
        yield call(api.coachingItems.remove, action.id)
        yield put(removeCoachingItemSuccess)
    } catch(e) {
        yield put(removeCoachingItemError())
    }
}

function* watchCoachingItemRemoving() {
    yield takeEvery(types.REMOVE_COACHING_ITEM, removeCoachingItem)
}

export default watchCoachingItemRemoving