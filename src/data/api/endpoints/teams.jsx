import instance from '../instance';
import '../../../helpers/DateHelper';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'teams/';

const teams = {
  list(full, teamGroupId, nestedCollaborators = false, abortController = null) {
    let url = baseUrl;
    // if (full !== null && full === true) url = `${url}?full=True`;
    // if (teamGroupId) url = `${url}${ full !== null && full === true ? '&' : '?' }teamGroupId=${teamGroupId}`;

    const result = instance.get(
      appendSearchParams(url, { full, teamGroupId, nestedCollaborators }),
      { signal: abortController?.signal }
    );
    return result;
  },
  listByGroup(teamGroupId, full) {
    return instance.get(
      `${baseUrl}list-by-group/?teamGroupId=${teamGroupId}${
        full ? '&full=True' : ''
      }`
    );
  },
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  definitions(id, periodId, current, detail) {
    let url = `${baseUrl}${id}/definitions/?period=${periodId}`;
    if (current !== undefined && current !== null)
      url = `${url}&current=${current}`;
    if (detail !== null) url = `${url}&detail=${detail}`;
    return instance.get(url);
  },
  create(team) {
    return instance.post(baseUrl, team);
  },
  update(team) {
    const url = `${baseUrl}${team.id}/`;
    return instance.put(url, team);
  },
  delete(id) {
    const url = `${baseUrl}${id}/`;
    return instance.delete(url);
  },
  categoryRanks(id, year) {
    var url = `${baseUrl}${id}/category-ranks/`;
    if (year != null) url = `${url}?year=${year}`;
    return instance.get(url);
  },
  challengeRank(id, year) {
    var url = `${baseUrl}${id}/challenge-rank/`;
    if (year != null) url = `${url}?year=${year}`;
    return instance.get(url);
  },
  collaboratorChallenges(id, time, year, start, end, type) {
    var url = `${baseUrl}${id}/collaborator-challenges/?time=${time}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (type != null) url = `${url}&type=${type}`;
    return instance.get(url);
  },
  collaboratorGoals(
    id,
    current,
    category,
    year,
    start,
    end,
    name,
    definition,
    all
  ) {
    var url = `${baseUrl}${id}/collaborator-goals/?current=${current}`;
    if (category != null) url = `${url}&category=${category}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (definition != null) url = `${url}&definition=${definition}`;
    if (name != null && name !== '') url = `${url}&name=${name}`;
    if (all != null && all !== '') url = `${url}&all=${all}`;
    return instance.get(url);
  },
  collaboratorGoalStats(definitionId, teamId) {
    const url = `${baseUrl}${teamId}/collaborator-goal-stats/?definition=${definitionId}`;
    return instance.get(url);
  },
  collaboratorPointSummary(id, periodId) {
    var url = `${baseUrl}${id}/collaborator-point-summary/`;
    if (periodId != null) url = `${url}?period=${periodId}`;
    return instance.get(url);
  },

  collaborators(id, options = {}) {
    let url = `${baseUrl}${id}/collaborators/`;
    const {
      simpleCollaborators,
      collaboratorIds,
      listCollaborators,
      abortController,
      limit,
      search,
      orderBy,
    } = options;
    return instance.get(
      appendSearchParams(url, {
        simpleCollaborators,
        collaboratorIds,
        listCollaborators,
        limit,
        search,
        orderBy,
      }),
      { signal: abortController?.signal }
    );
  },
  freeColors() {
    const url = `${baseUrl}free-colors/`;
    return instance.get(url);
  },
  generalRank(id, year) {
    var url = `${baseUrl}${id}/general-rank/`;
    if (year != null) url = `${url}?year=${year}`;
    return instance.get(url);
  },
  goals(id, current, category) {
    const ordering = current ? '-timer' : 'timer';
    const currentToString = current ? 'True' : 'False';
    var url = `${baseUrl}${id}/goals/?current=${currentToString}&ordering=${ordering}`;
    if (category != null) url = `${url}&category=${category}`;
    return instance.get(url);
  },
  goalCategories(id, year) {
    var url = `${baseUrl}${id}/goal-categories/`;
    if (year != null) url = `${url}?year=${year}`;
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
  teamGoals(id, current, category, year, start, end, name, definition, all) {
    var url = `${baseUrl}${id}/team-goals/?current=${current}`;
    if (category != null) url = `${url}&category=${category}`;
    if (year != null) url = `${url}&year=${year}`;
    if (start != null) url = `${url}&start=${start.toUTCJSON()}`;
    if (end != null) url = `${url}&end=${end.toUTCJSON()}`;
    if (definition != null) url = `${url}&definition=${definition}`;
    if (name != null && name !== '') url = `${url}&name=${name}`;
    if (all != null && all !== '') url = `${url}&all=${all}`;
    return instance.get(url);
  },
  teamGoalStats(definitionId, teamId) {
    const url = `${baseUrl}${teamId}/team-goal-stats/?definition=${definitionId}`;
    return instance.get(url);
  },
  teamPointSummary(id, periodId) {
    var url = `${baseUrl}${id}/team-point-summary/`;
    if (periodId != null) url = `${url}?period=${periodId}`;
    return instance.get(url);
  },
};

export default teams;
