import instance from '../instance'

const baseUrl = 'challenge-reward-types/';

const challengeRewardTypes = {
    list() {
        return instance.get(baseUrl)
    }
};

export default challengeRewardTypes
