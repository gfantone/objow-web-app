import instance from '../instance';

const baseUrl = 'collaborator-challenge-summaries/';

const collaboratorChallengeSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default collaboratorChallengeSummaries;
