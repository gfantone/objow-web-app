import instance from '../instance'

const baseUrl = 'goals/';

const goals = {
    updateTarget(id, target) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { target })
    }
};

export default goals
