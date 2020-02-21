import instance from '../instance'

const baseUrl = 'team-challenge-summaries/';

const teamChallengeSummaries = {
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    }
};

export default teamChallengeSummaries