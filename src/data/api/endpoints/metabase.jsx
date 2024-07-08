import instance from '../instance';

const baseUrl = 'metabase/';

const metabase = {
  list() {
    return instance.get(baseUrl);
  },
};

export default metabase;
