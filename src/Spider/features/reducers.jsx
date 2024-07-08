import authReducers from './auth/reducers';
import configsReducers from './config/reducers';
import teamGroupReducers from './teamGroup/reducers';

export default {
    ...authReducers,
    ...configsReducers,
    ...teamGroupReducers,
}
