import authReducers from './auth/reducers';
<<<<<<< HEAD

export default {
    ...authReducers,
=======
import baseReducers from './base/reducers';
import configsReducers from './config/reducers';
import teamGroupReducers from './teamGroup/reducers';
import systemImageReducers from './systemFiles/reducers';

export default {
    ...authReducers,
    ...baseReducers,
    ...configsReducers,
    ...teamGroupReducers,
    ...systemImageReducers,
>>>>>>> dev
}
