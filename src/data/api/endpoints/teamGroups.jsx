import instance from '../instance';
import '../../../helpers/DateHelper';
import { appendSearchParams } from '../../../helpers/UrlHelper';
import _ from 'lodash';

const baseUrl = 'team-groups/';

const teamGroups = {
  list(full, abortController = null) {
    let url = `${baseUrl}${full ? '?full=true' : ''}`;
    return instance.get(url, { signal: abortController?.signal });
  },

  tree(full, admin, abortController = null) {
    const endpoint = admin ? 'admin_tree' : 'tree';

    return instance.get(`${baseUrl}${endpoint}/${full ? '?full=true' : ''}`, {
      signal: abortController?.signal,
    });
  },

  collaborators(id, options = {}) {
    const url = `${baseUrl}${id}/collaborators/`;
    const {
      simpleCollaborators,
      collaboratorIds,
      listCollaborators,
      abortController,
      limit,
      orderBy,
      search,
    } = options;
    return instance.get(
      appendSearchParams(url, {
        simpleCollaborators,
        collaboratorIds,
        listCollaborators,
        limit,
        orderBy,
        search,
      }),
      { signal: abortController?.signal }
    );
  },

  collaboratorChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/collaborator-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },

  teamChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/team-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },

  teamGroupBasedChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/team-group-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },
  teamPersonalizedChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/team-personalized-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },

  create(teamGroup) {
    return instance.post(baseUrl, teamGroup);
  },

  update(teamGroup) {
    const url = `${baseUrl}${teamGroup.id}/`;
    return instance.put(url, teamGroup);
  },
  delete(id) {
    const url = `${baseUrl}${id}/`;
    return instance.delete(url);
  },
};

export default teamGroups;
