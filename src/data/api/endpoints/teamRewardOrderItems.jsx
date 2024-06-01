import instance from '../instance';

const baseUrl = 'team-reward-order-items/';

const teamRewardOrderItems = {
  create(item) {
    return instance.post(baseUrl, item);
  },
};

export default teamRewardOrderItems;
