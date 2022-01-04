import { call, put, takeLatest } from 'redux-saga/effects'
import { getCollaboratorCategoryRankListSuccess, getCollaboratorCategoryRankListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getCollaboratorCategoryRankListByCategory(action) {
    try {
        const { data: ranks } = yield call(api.categories.collaboratorRanks, action.categoryId, action.periodId);
        yield put(getCollaboratorCategoryRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorCategoryRankListError())
    }
}

function* getCollaboratorCategoryRankListByCollaborator(action) {
    try {
        const { data: ranks } = yield call(api.collaborators.categoryRanks, action.collaboratorId, action.year);
        yield put(getCollaboratorCategoryRankListSuccess(ranks))
    } catch(e) {
        yield put(getCollaboratorCategoryRankListError())
    }
}

export function* watchCollaboratorCategoryRankListByCategory() {
    yield takeLatest(types.GET_COLLABORATOR_CATEGORY_RANK_LIST_BY_CATEGORY, getCollaboratorCategoryRankListByCategory)
}

export function* watchCollaboratorCategoryRankListByCollaborator() {
    yield takeLatest(types.GET_COLLABORATOR_CATEGORY_RANK_LIST_BY_COLLABORATOR, getCollaboratorCategoryRankListByCollaborator)
}