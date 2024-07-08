import getTeamGroupReducers from './getTeamGroup/slices';
import updateTeamGroupReducers from './updateTeamGroup/slices';

export default {
    ...getTeamGroupReducers,
    ...updateTeamGroupReducers
};
