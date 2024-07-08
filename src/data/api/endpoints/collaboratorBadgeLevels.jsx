import instance from '../instance';

const baseUrl = 'collaborator-badge-levels/';

const collaboratorBadgeLevels = {
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
};

export default collaboratorBadgeLevels;
