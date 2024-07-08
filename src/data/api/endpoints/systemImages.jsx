import instance from '../instance';

<<<<<<< HEAD
const baseUrl = 'system-images/';
=======
const baseUrl = 'system-files/';
>>>>>>> dev

const systemImages = {
  list() {
    return instance.get(baseUrl);
  },
  update(code, image) {
    const url = `${baseUrl}${code}/`;
    return instance.put(url, image);
  },
<<<<<<< HEAD
=======
  delete(imageId) {
    const url = `${baseUrl}${imageId}`;
    return instance.delete(url);
  },
>>>>>>> dev
};

export default systemImages;
