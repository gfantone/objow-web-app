import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getBadgeLevelListSuccess, getBadgeLevelListError } from './actions'
import * as types from './actionTypes'
import api from '../../../data/api/api'

function* getBadgeLevelList(action) {
    try {
        var { data: levels } = yield call(api.badges.levels, action.badgeId)
        const percentages = yield all(levels.map(level => call(api.badgeLevels.successfulCollaborators, level.id)))
        levels.map(level => {
            var index = levels.indexOf(level)
            level.percentage = percentages[index].data
        })
        yield put(getBadgeLevelListSuccess(levels))
    } catch(e) {
        yield put(getBadgeLevelListError())
    }
}

function* watchBadgeLevelList() {
    yield takeLatest(types.GET_BADGE_LEVEL_LIST, getBadgeLevelList)
}

export default watchBadgeLevelList