import instance from '../instance';

const baseUrl = 'goal-types/';

const goalTypes = {
  list() {
    return instance.get(baseUrl);
  },
};

export default goalTypes;
