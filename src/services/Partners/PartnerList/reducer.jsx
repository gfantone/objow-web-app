import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let PartnerList = (state = initialState.partnerList, action) => {
    switch (action.type) {
        case types.GET_PARTNER_LIST:
            return {...state, partners: null, loading: true, hasError: false}

        case types.GET_PARTNER_LIST_SUCCESS:
            return {...state, partners: action.partners, loading: false, hasError: false}

        case types.GET_PARTNER_LIST_ERROR:
            return {...state, partners: null, loading: false, hasError: true}

        default:
            return state
    }
}

export default PartnerList
