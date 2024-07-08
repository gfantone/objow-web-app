import instance from '../instance';

const baseUrl = 'periodicities/';

const periodicities = {
  list() {
    return instance.get(baseUrl);
  },
};

export default periodicities;
