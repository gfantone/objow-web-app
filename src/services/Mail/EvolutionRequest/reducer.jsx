import * as types from './actionTypes';
import initialState from '../../../store/initialState';

let EvolutionRequest = (state = initialState.evolutionRequest, action) => {
    switch (action.type) {
        case types.REQUEST_EVOLUTION:
            return {...state, success: false, loading: true, hasError: false};

        case types.REQUEST_EVOLUTION_SUCCESS:
            return {...state, success: true, loading: false, hasError: false};

        case types.REQUEST_EVOLUTION_ERROR:
            return {...state, success: false, loading: false, hasError: true};

        case types.CLEAR_EVOLUTION_REQUEST:
            return {...state, success: false, loading: false, hasError: false};

        default:
            return state
    }
};

export default EvolutionRequest