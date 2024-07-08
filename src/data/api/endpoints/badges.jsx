import instance from '../instance';

const baseUrl = 'badges/';

const badges = {
  create(badge) {
    const url = `${baseUrl}`;
    return instance.post(url, badge);
  },
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  levelCount(id) {
    const url = `${baseUrl}${id}/level-count/`;
    return instance.get(url);
  },
  levels(id) {
    const url = `${baseUrl}${id}/levels/`;
    return instance.get(url);
  },
  points(id) {
    const url = `${baseUrl}${id}/points/`;
    return instance.get(url);
  },
  update(id, badge) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, badge);
  },
  usableIcons(id) {
    const url = `${baseUrl}${id}/usable-icons/`;
    return instance.get(url);
  },
};

export default badges;
