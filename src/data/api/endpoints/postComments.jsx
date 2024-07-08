import instance from '../instance';

const baseUrl = 'post-comments/';

const posts = {
  like(commentId) {
    return instance.post(`${baseUrl}${commentId}/like/`);
  },
  dislike(commentId) {
    return instance.post(`${baseUrl}${commentId}/dislike/`);
  },
  report(commentId) {
    return instance.post(`${baseUrl}${commentId}/report/`);
  },
  delete(commentId) {
    return instance.delete(`${baseUrl}${commentId}/`);
  },
  update(comment) {
    return instance.put(`${baseUrl}${comment.id}/`, comment);
  },
};

export default posts;
