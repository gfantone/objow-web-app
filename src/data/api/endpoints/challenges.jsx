import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';
import instance from '../instance';
import '../../../helpers/DateHelper';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'challenges/';

const challenges = {
  create(challenge, teamId) {
    var url = `${baseUrl}`;
    if (teamId) url += `?team=${teamId}`;

    const source = CancelToken.source();
    const request = instance.post(url, challenge, {
      cancelToken: source.token,
    });
    request[CANCEL] = () => source.cancel();
    return request;
    // return instance.post(url, challenge)
  },
  update(challengeFormData, challenge) {
    const url = `${baseUrl}${challenge.id}/`;
    return instance.put(url, challengeFormData);
  },
  delete(challenge) {
    const url = `${baseUrl}${challenge.sourceId}/`;
    return instance.delete(url);
  },
  usablePoints(id, start = null, end = null) {
    var url = `${baseUrl}${id}/usable-points/`;
    if (start && end)
      url += `?start=${start.toUTCJSON()}&end=${end.toUTCJSON()}`;
    return instance.get(url);
  },
  detail(id, edit) {
    let url = `${baseUrl}${id}/`;
    if (edit) {
      url = `${url}?edit=True`;
    }
    return instance.get(url);
  },
  awards(id) {
    const url = `${baseUrl}${id}/awards/`;
    return instance.get(url);
  },
  participants(id, asIds) {
    const url = `${baseUrl}${id}/participants/`;

    return instance.get(appendSearchParams(url, { asIds }));
  },
  participant_collaborators(id, search, page) {
    const url = `${baseUrl}${id}/participant-collaborators/`;

    return instance.get(appendSearchParams(url, { search, page }));
  },
  changeAwards(id, awards) {
    const url = `${baseUrl}${id}/change-awards/`;
    return instance.post(url, awards);
  },
  goals(id) {
    const url = `${baseUrl}${id}/goals/`;
    return instance.get(url);
  },
  changeGoals(id, goals) {
    const url = `${baseUrl}${id}/change-goals/`;
    return instance.post(url, goals);
  },
  // Get challenge summary by context
  summary(id, collaborator, team, team_group) {
    let url = `${baseUrl}${id}/summary/`;
    if (collaborator) {
      url = `${url}?collaborator=${collaborator}`;
    } else if (team) {
      url = `${url}?team=${team}`;
    } else if (team_group) {
      url = `${url}?team_group=${team_group}`;
    }
    return instance.get(url);
  },
  goal_points(id, { collaborator_id, team_id, team_group_id }) {
    let url = `${baseUrl}${id}/goal-points/`;
    return instance.get(
      appendSearchParams(url, { collaborator_id, team_id, team_group_id })
    );
  },
  top_participants(id) {
    let url = `${baseUrl}${id}/top-participants/`;

    return instance.get(url);
  },
};

export default challenges;
