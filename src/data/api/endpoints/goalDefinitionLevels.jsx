import instance from '../instance';

const baseUrl = 'goal-definition-levels/';

const goalDefinitionLevels = {
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
};

export default goalDefinitionLevels;
