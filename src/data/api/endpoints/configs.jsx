import instance from '../instance';

const baseUrl = 'configs/';

const configs = {
  permanent() {
    const url = `${baseUrl}permanent/`;
    return instance.get(url);
  },
  detail(code) {
    const url = `${baseUrl}${code}/`;
    return instance.get(url);
  },
  update(id, value) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, {
      value: value != null && value.toString() != '' ? value.toString() : null,
    });
  },
};

export default configs;
