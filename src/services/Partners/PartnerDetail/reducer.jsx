import * as types from './actionTypes';
import initialState from '../../../store/initialState';

const PartnerDetail = (state = initialState.partnerDetail, action) => {
    switch (action.type) {
        case types.GET_PARTNER:
            return {...state, partner: null, loading: true, hasError: false}

        case types.GET_PARTNER_SUCCESS:
            return {...state, partner: action.partner, loading: false, hasError: false}

        case types.GET_PARTNER_ERROR:
            return {...state, partner: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default PartnerDetail
