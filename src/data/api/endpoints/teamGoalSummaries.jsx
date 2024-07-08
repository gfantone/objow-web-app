import instance from '../instance';

const baseUrl = 'team-goal-summaries/';

const teamGoalSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default teamGoalSummaries;
