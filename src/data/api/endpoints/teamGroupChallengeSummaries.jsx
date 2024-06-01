import instance from '../instance';

const baseUrl = 'team-group-challenge-summaries/';

const teamGroupChallengeSummaries = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default teamGroupChallengeSummaries;
