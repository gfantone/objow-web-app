import instance from '../instance'

const baseUrl = 'challenge-images/';

const challengeImages = {
    list() {
        return instance.get(baseUrl)
    }
};

export default challengeImages