import instance from '../instance';

const baseUrl = 'reward-images/';

const rewardImages = {
  list() {
    return instance.get(baseUrl);
  },
};

export default rewardImages;
