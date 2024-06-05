import instance from '../instance';

const baseUrl = 'notifications/';

const notifications = {
  list() {
    return instance.get(baseUrl);
  },
  update(id, value, inactivityDays) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, {
      value: value != null && value.toString() != '' ? value.toString() : null,
      inactivity_days:
        inactivityDays != null && inactivityDays.toString() !== ''
          ? inactivityDays.toString()
          : null,
    });
  },
};

export default notifications;
