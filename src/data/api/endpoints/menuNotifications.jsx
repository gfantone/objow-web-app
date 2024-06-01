import instance from '../instance';

const baseUrl = 'menu-notifications/';

const menuNotifications = {
  list() {
    return instance.get(baseUrl);
  },
  newCount() {
    const url = `${baseUrl}new-count/`;
    return instance.get(url);
  },
  update(id, read) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { read });
  },
};

export default menuNotifications;
