import instance from '../instance';

const baseUrl = 'levels/';

const levels = {
  bulkCreate(levels) {
    const url = `${baseUrl}bulk-create/`;
    return instance.post(url, levels);
  },
  successfulCollaborators(id) {
    const url = `${baseUrl}${id}/successful-collaborators/`;
    return instance.get(url);
  },
};

export default levels;
