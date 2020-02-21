import { call, put, takeEvery } from 'redux-saga/effects'
import {getUserPlayerCategoryRankListSuccess, getUserPlayerCategoryRankListError} from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getUserPlayerCategoryRankList(action) {
    try {
        let {data: ranks} = yield call(api.account.playerCategoryRanks)
        yield put(getUserPlayerCategoryRankListSuccess(ranks))
    } catch(e) {
        yield put(getUserPlayerCategoryRankListError())
    }
}

function* watchUserPlayerCategoryRankList() {
    yield takeEvery(types.GET_USER_PLAYER_CATEGORY_RANK_LIST, getUserPlayerCategoryRankList)
}

export default watchUserPlayerCategoryRankList