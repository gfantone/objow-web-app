import instance from '../instance';

const baseUrl = 'week-overlaps/';

const units = {
  list() {
    return instance.get(baseUrl);
  },
  create(overlap) {
    return instance.post(baseUrl, overlap);
  },
  update(weekOverlapData, weekOverlap) {
    const url = `${baseUrl}${weekOverlap.id}/`;
    return instance.put(url, weekOverlapData);
  },
  delete(weekOverlapId) {
    const url = `${baseUrl}${weekOverlapId}/`;
    return instance.delete(url);
  },
};

export default units;
