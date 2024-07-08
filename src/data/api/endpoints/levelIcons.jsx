import instance from '../instance';

const baseUrl = 'level-icons/';

const levelIcons = {
  usable() {
    const url = `${baseUrl}usable/`;
    return instance.get(url);
  },
};

export default levelIcons;
