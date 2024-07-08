import instance from '../instance';

const baseUrl = 'team-collaborator-goals/';

const teamCollaboratorGoals = {
  advices(id) {
    const url = `${baseUrl}${id}/advices/`;
    return instance.get(url);
  },
  changeAdvices(id, advices) {
    const url = `${baseUrl}${id}/change-advices/`;
    return instance.post(url, advices);
  },
  update(id, target) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { target });
  },
  goals(id) {
    const url = `${baseUrl}${id}/goals/`;
    return instance.get(url);
  },
  levels(id) {
    const url = `${baseUrl}${id}/levels/`;
    return instance.get(url);
  },
  definition(id) {
    const url = `${baseUrl}${id}/definition/`;
    return instance.get(url);
  },
  ranks(id, page) {
    let url = `${baseUrl}${id}/ranks/`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    return instance.get(url);
  },
};

export default teamCollaboratorGoals;
