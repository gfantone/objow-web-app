import instance from '../instance';

const baseUrl = 'team-collaborator-goal-summaries/';

const teamCollaboratorGoalSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default teamCollaboratorGoalSummaries;
