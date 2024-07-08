import instance from '../instance';

const baseUrl = `team-reward-order-summaries/`;

const teamRewardOrderSummaries = {
  validated() {
    const url = `${baseUrl}validated/`;
    return instance.get(url);
  },
  waiting() {
    const url = `${baseUrl}waiting/`;
    return instance.get(url);
  },
};

export default teamRewardOrderSummaries;
