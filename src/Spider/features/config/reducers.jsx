import getConfigsReducers from './getConfigs/slices';
import updateConfigsReducers from './updateConfigs/slices';

export default {
    ...getConfigsReducers,
    ...updateConfigsReducers
};
