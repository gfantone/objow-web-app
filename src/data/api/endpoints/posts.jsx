import instance from '../instance';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'posts/';

const posts = {
  list(page, smallPages) {
    return instance.get(appendSearchParams(baseUrl, { page, smallPages }));
  },
  create(post) {
    return instance.post(baseUrl, post);
  },
  delete(postId) {
    return instance.delete(`${baseUrl}${postId}/`);
  },
  update(postId, data) {
    return instance.put(`${baseUrl}${postId}/`, data);
  },
  like(postId) {
    return instance.post(`${baseUrl}${postId}/like/`);
  },
  dislike(postId) {
    return instance.post(`${baseUrl}${postId}/dislike/`);
  },
  report(postId) {
    return instance.post(`${baseUrl}${postId}/report/`);
  },
  comment(postId, comment) {
    return instance.post(`${baseUrl}${postId}/comment/`, comment);
  },
  comments(postId) {
    return instance.get(`${baseUrl}${postId}/comments/`);
  },
};

export default posts;
