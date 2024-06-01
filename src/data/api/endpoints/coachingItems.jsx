import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';
import instance from '../instance';

const baseUrl = 'coaching-items/';

const coachingItems = {
  create(item) {
    const source = CancelToken.source();
    const request = instance.post(baseUrl, item, { cancelToken: source.token });
    request[CANCEL] = () => source.cancel();
    return request;
    // return instance.post(baseUrl, item)
  },
  update(item) {
    const url = `${baseUrl}${item.id}/`;
    return instance.put(url, item);
  },
  updateState(id, state) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { state });
  },
  remove(id) {
    const url = `${baseUrl}${id}/`;
    return instance.delete(url);
  },
};

export default coachingItems;
