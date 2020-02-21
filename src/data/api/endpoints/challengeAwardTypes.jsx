import instance from '../instance'

const baseUrl = 'challenge-award-types/';

const challengeAwardTypes = {
    list() {
        return instance.get(baseUrl)
    }
};

export default challengeAwardTypes