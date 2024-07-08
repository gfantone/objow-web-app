import instance from '../instance';

const baseUrl = 'system-files/';

const systemImages = {
  list() {
    return instance.get(baseUrl);
  },
  update(code, image) {
    const url = `${baseUrl}${code}/`;
    return instance.put(url, image);
  },
  delete(imageId) {
    const url = `${baseUrl}${imageId}`;
    return instance.delete(url);
  },
};

export default systemImages;
