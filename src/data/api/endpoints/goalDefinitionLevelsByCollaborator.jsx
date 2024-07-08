import instance from '../instance';

const baseUrl = 'goal-definition-levels-by-collaborator/';

const goalDefinitionLevelsByCollaborator = {
  create(level, collaborator) {
    return instance.post(baseUrl, level);
  },
  update(level, collaborator) {
    const url = `${baseUrl}${level.id}/`;

    return instance.put(url, level);
  },
  remove(id) {
    const url = `${baseUrl}${id}/`;
    return instance.delete(url);
  },
};

export default goalDefinitionLevelsByCollaborator;
