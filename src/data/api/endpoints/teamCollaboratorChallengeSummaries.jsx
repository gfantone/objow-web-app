import instance from '../instance';

const baseUrl = 'team-collaborator-challenge-summaries/';

const teamCollaboratorChallengeSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default teamCollaboratorChallengeSummaries;
