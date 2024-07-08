import instance from '../instance';

const baseUrl = 'collaborator-goal-summaries/';

const collaboratorGoalSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default collaboratorGoalSummaries;
