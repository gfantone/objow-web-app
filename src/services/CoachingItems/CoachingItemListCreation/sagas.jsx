import { all, call, put, takeEvery } from 'redux-saga/effects'
import { createCoachingItemListSuccess, createCoachingItemListError } from './actions'
import { getCoachingItemListSuccess } from '../CoachingItemList/actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* createCoachingItemList(action) {
    try {
        yield all(action.items.map(item => call(api.coachingItems.create, item)))
        const collaboratorId = action.items && action.items.length > 0 ? action.items[0].collaborator : null
        if (collaboratorId) {
            const { data: items } = yield call(api.collaborators.coachingItems, collaboratorId)
            yield put(getCoachingItemListSuccess(items))
        }
        yield put(createCoachingItemListSuccess())
    } catch(e) {
        yield put(createCoachingItemListError())
    }
}

function* watchCoachingItemListCreation() {
    yield takeEvery(types.CREATE_COACHING_ITEM_LIST, createCoachingItemList)
}

export default watchCoachingItemListCreation