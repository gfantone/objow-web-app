import instance from '../instance'

const baseUrl = 'goal-points/';

const goalPoints = {
    list() {
        return instance.get(baseUrl)
    }
};

export default goalPoints