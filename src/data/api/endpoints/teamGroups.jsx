import instance from '../instance';
import '../../../helpers/DateHelper';
import { appendSearchParams } from '../../../helpers/UrlHelper';
<<<<<<< HEAD
import _ from 'lodash';
=======
>>>>>>> dev

const baseUrl = 'team-groups/';

const teamGroups = {
<<<<<<< HEAD
=======
  get (teamGroupId) {
    let url = `${baseUrl}${teamGroupId}`;
    return instance.get(url);
  },
>>>>>>> dev
  list(full, abortController = null) {
    let url = `${baseUrl}${full ? '?full=true' : ''}`;
    return instance.get(url, { signal: abortController?.signal });
  },
<<<<<<< HEAD

=======
>>>>>>> dev
  tree(full, admin, abortController = null) {
    const endpoint = admin ? 'admin_tree' : 'tree';

    return instance.get(`${baseUrl}${endpoint}/${full ? '?full=true' : ''}`, {
      signal: abortController?.signal,
    });
  },
<<<<<<< HEAD

=======
>>>>>>> dev
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
<<<<<<< HEAD

=======
>>>>>>> dev
  collaboratorChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/collaborator-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },
<<<<<<< HEAD

=======
>>>>>>> dev
  teamChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/team-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },
<<<<<<< HEAD

=======
>>>>>>> dev
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
<<<<<<< HEAD

  create(teamGroup) {
    return instance.post(baseUrl, teamGroup);
  },

=======
  create(teamGroup) {
    return instance.post(baseUrl, teamGroup);
  },
>>>>>>> dev
  update(teamGroup) {
    const url = `${baseUrl}${teamGroup.id}/`;
    return instance.put(url, teamGroup);
  },
  delete(id) {
    const url = `${baseUrl}${id}/`;
    return instance.delete(url);
  },
<<<<<<< HEAD
=======
  listSystemFile(teamGroupId = 1) {
    // todo: after mock -> return instance.get(`team-group/${teamGroupId}/system-images/`);
    return instance.get(`system-images/`);
  },
  updateSystemFile(code, file, teamGroupId = 1) {
    const url = `team-group/${teamGroupId}/system-images/${code}/`;
    return instance.put(url, file);
  },
>>>>>>> dev
};

export default teamGroups;
