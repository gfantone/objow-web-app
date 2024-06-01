import instance from '../instance';
import '../../../helpers/DateHelper';

const baseUrl = 'challenge-types/';

const challengeTypes = {
  current() {
    const url = `${baseUrl}current/`;
    return instance.get(url);
  },
  usable() {
    const url = `${baseUrl}usable/`;
    return instance.get(url);
  },
  update(type) {
    const url = `${baseUrl}${type.id}/`;
    return instance.patch(url, {
      currentPoints: type.currentPoints,
      periodicity: type.periodicity,
    });
  },
  usablePoints(id, start, end, teamId) {
    var url = `${baseUrl}${id}/usable-points/?start=${start.toUTCJSON()}&end=${end.toUTCJSON()}`;
    if (teamId) url += `&team=${teamId}`;
    return instance.get(url);
  },
};

export default challengeTypes;
