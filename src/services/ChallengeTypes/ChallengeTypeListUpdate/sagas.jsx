import { all, call, put, takeEvery } from 'redux-saga/effects'
import { updateChallengeTypeListSuccess, updateChallengeTypeListError } from './actions'
import * as actionTypes from './actionTypes'
import api from '../../../data/api/api'

function* updateChallengeTypeList(action) {
    try {
        yield all(action.types.map(type => call(api.challengeTypes.update, type)));
        yield put(updateChallengeTypeListSuccess())
    } catch(e) {
        yield put(updateChallengeTypeListError())
    }
}

function* watchChallengeTypeListUpdate() {
    yield takeEvery(actionTypes.UPDATE_CHALLENGE_TYPE_LIST, updateChallengeTypeList)
}

export default watchChallengeTypeListUpdate