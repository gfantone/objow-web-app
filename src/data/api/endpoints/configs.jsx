import instance from '../instance';
<<<<<<< HEAD

const baseUrl = 'configs/';

const configs = {
  permanent() {
    const url = `${baseUrl}permanent/`;
    return instance.get(url);
=======
import { appendSearchParams } from '../../../helpers/UrlHelper';
const baseUrl = 'configs/';

const configs = {
  permanent(teamGroup = 1, codes = [], period = null) {
    const url = `team-groups/${teamGroup}/config`; // @todo endpoint dans team_group
    const params = new URLSearchParams();
    if (codes && codes.length > 0) {
      codes.forEach((code) => {
        params.append('codes', code);
      });
    }
    return instance.get(appendSearchParams(url, { period }), { params });
>>>>>>> dev
  },
  detail(code) {
    const url = `${baseUrl}${code}/`;
    return instance.get(url);
  },
  update(id, value) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, {
      value: value != null && value.toString() != '' ? value.toString() : null,
    });
  },
};

export default configs;
