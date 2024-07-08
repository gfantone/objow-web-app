import instance from '../instance';

const baseUrl = 'collaborator-badge-summaries/';

const collaboratorBadgeSummary = {
  collaborators(id) {
    const url = `${baseUrl}${id}/collaborators/`;
    return instance.get(url);
  },
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default collaboratorBadgeSummary;
