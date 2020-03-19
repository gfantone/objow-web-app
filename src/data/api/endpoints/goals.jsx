import instance from '../instance'

const baseUrl = 'goals/';

const goals = {
    changeAdvices(id, advices) {
        const url = `${baseUrl}${id}/change-advices/`;
        return instance.post(url, advices)
    },
    updateTarget(id, target) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { target })
    }
};

export default goals
