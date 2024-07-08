import getSystemImageReducers from './getSystemFiles/slices';
import updateSystemImageReducers from './updateSystemFiles/slices';
import deleteSystemImageReducers from './deleteSystemFiles/slices';

export default {
    ...getSystemImageReducers,
    ...updateSystemImageReducers,
    ...deleteSystemImageReducers
};
