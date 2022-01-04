import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getBadgeListSuccess, getBadgeListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getBadgeList(action) {
    try {
        var { data: badges } = yield call(api.periods.badges, action.periodId);
        const levelList = yield all(badges.map(badge => call(api.badges.levelCount, badge.id)));
        const pointList = yield all(badges.map(badge => call(api.badges.points, badge.id)));
        badges.map(badge => {
            var index = badges.indexOf(badge);
            badge.levels = levelList[index].data;
            badge.points = pointList[index].data
        });
        yield put(getBadgeListSuccess(badges))
    } catch(e) {
        yield put(getBadgeListError())
    }
}

function* watchBadgeList() {
    yield takeLatest(types.GET_BADGE_LIST, getBadgeList)
}

export default watchBadgeList