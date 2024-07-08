import instance from '../instance';

const baseUrl = 'open-graph/';

const configs = {
  get(requestUrl) {
    const url = `${baseUrl}?url=${requestUrl}`;
    return instance.get(url);
  },
};

export default configs;
