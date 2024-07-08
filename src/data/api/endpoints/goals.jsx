import instance from '../instance';

const baseUrl = 'goals/';

const goals = {
  updateTarget(id, target) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { target });
  },
  import(request) {
    const url = `${baseUrl}import/`;
    return instance.post(url, request);
  },
};

export default goals;
