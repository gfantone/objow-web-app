import instance from '../instance';

const baseUrl = 'badge-levels/';

const badgeLevels = {
  create(level) {
    return instance.post(baseUrl, level);
  },
  update(level) {
    const url = `${baseUrl}${level.id}/`;
    return instance.put(url, level);
  },
  remove(id) {
    const url = `${baseUrl}${id}/`;
    return instance.delete(url);
  },
  successfulCollaborators(id) {
    const url = `${baseUrl}${id}/successful-collaborators/`;
    return instance.get(url);
  },
};

export default badgeLevels;
