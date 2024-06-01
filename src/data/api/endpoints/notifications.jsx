import instance from '../instance';

const baseUrl = 'notifications/';

const notifications = {
  list() {
    return instance.get(baseUrl);
  },
  update(id, value) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, {
      value: value != null && value.toString() != '' ? value.toString() : null,
    });
  },
};

export default notifications;
