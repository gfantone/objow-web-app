import { call, put, takeLatest } from 'redux-saga/effects'
import { requestEvolutionSuccess, requestEvolutionError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* requestEvolution(action) {
    try {
        yield call(api.mails.requestEvolution, action.request);
        yield put(requestEvolutionSuccess())
    } catch(e) {
        yield put(requestEvolutionError())
    }
}

function* watchEvolutionRequest() {
    yield takeLatest(types.REQUEST_EVOLUTION, requestEvolution)
}

export default watchEvolutionRequest