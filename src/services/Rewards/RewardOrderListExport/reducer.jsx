import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const RewardOrderListExport = (state = initialState.rewardOrderListExport, action) => {
    switch (action.type) {
        case types.EXPORT_REWARD_ORDER_LIST:
            return {...state, success: false, loading: true, hasError: false}

        case types.EXPORT_REWARD_ORDER_LIST_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.EXPORT_REWARD_ORDER_LIST_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        default:
            return state
    }
}

export default RewardOrderListExport
