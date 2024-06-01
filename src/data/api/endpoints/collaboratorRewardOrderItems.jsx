import instance from '../instance';

const baseUrl = 'collaborator-reward-order-items/';

const collaboratorRewardOrderItems = {
  create(item) {
    return instance.post(baseUrl, item);
  },
};

export default collaboratorRewardOrderItems;
