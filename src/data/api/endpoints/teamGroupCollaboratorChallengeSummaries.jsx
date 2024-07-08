import instance from '../instance';

const baseUrl = 'team-group-collaborator-challenge-summaries/';

const teamGroupCollaboratorChallengeSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default teamGroupCollaboratorChallengeSummaries;
