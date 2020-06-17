import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const CollaboratorRewardOrderUpdate = (state = initialState.collaboratorRewardOrderUpdate, action) => {
    switch (action.type) {
        case types.UPDATE_COLLABORATOR_REWARD_ORDER_VALIDATION:
            return {...state, success: false, loading: true, hasError: false}

        case types.UPDATE_COLLABORATOR_REWARD_ORDER_SUCCESS:
            return {...state, success: true, loading: false, hasError: false}

        case types.UPDATE_COLLABORATOR_REWARD_ORDER_ERROR:
            return {...state, success: false, loading: false, hasError: true}

        case types.CLEAR_COLLABORATOR_REWARD_ORDER_UPDATE:
            return {...state, success: false, loading: false, hasError: false}

        default:
            return state
    }
}

export default CollaboratorRewardOrderUpdate
