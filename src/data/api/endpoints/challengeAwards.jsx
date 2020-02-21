import instance from '../instance'

const baseUrl = 'challenge-awards/';

const challengeAwards = {
    bulkCreate(awards) {
        const url = `${baseUrl}bulk-create/`;
        return instance.post(url, awards)
    },
    bulkUpdate(awards) {
        const url = `${baseUrl}bulk-update/`;
        return instance.patch(url, awards)
    }
};

export default challengeAwards