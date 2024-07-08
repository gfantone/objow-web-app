import instance from '../instance';

const baseUrl = 'collaborator-reward-order-summaries/';

const collaboratorRewardOrderSummaries = {
  validated() {
    const url = `${baseUrl}validated/`;
    return instance.get(url);
  },
  pending() {
    const url = `${baseUrl}pending/`;
    return instance.get(url);
  },
  waiting() {
    const url = `${baseUrl}waiting/`;
    return instance.get(url);
  },
};

export default collaboratorRewardOrderSummaries;
