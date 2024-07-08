import instance from '../instance';

const baseUrl = 'badge-icons/';

const badgeIcons = {
  usable() {
    const url = `${baseUrl}usable/`;
    return instance.get(url);
  },
};

export default badgeIcons;
