import instance from '../instance';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'users/';

const users = {
  create(user) {
    user.isActive = true;
    return instance.post(baseUrl, user);
  },
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  import(request) {
    const url = `${baseUrl}import/`;
    return instance.post(url, request);
  },
  export(request, isActive) {
    const url = `${baseUrl}export?isActive=${isActive}`;
    return instance.get(url, request);
  },
  list(
    isActive,
    simple,
    page,
    search,
    orderBy,
    roleCode,
    limit,
    smallPages,
    full
  ) {
    const url = appendSearchParams(baseUrl, {
      isActive,
      simple,
      page,
      search,
      orderBy,
      roleCode,
      limit,
      smallPages,
      full,
    });

    return instance.get(url);
  },
  update(user, payload) {
    const url = `${baseUrl}${user.id}/`;
    return instance.patch(
      url,
      payload || {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        team: user.team,
        locale: user.locale,
        identifiers: user.identifiers,
        force_reset_password: user.force_reset_password,
        citation: user.citation,
        title: user.title,
      }
    );
  },
  resetPassword(data) {
    const url = `${baseUrl}reset-password/`;
    return instance.post(url, data);
  },
  resetPasswordConfirm(data) {
    let url = `${baseUrl}reset-password-confirm/`;

    if (data && data.force) {
      url = `${url}?force=${data.force}`;
    }
    return instance.post(url, data);
  },
  sendNewPassword(id) {
    const url = `${baseUrl}${id}/create-new-password/`;
    return instance.post(url);
  },
  updateActivation(id, isActive) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { isActive });
  },
  updatePassword(id, password) {
    if (id) {
      const url = `${baseUrl}${id}/password/`;
      return instance.post(url, { password });
    }
    return new Promise();
  },
  updateTeam(id, team) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { team });
  },
  updateTeamGroup(id, teamGroup) {
    const url = `${baseUrl}${id}/`;
    return instance.patch(url, { team_group: teamGroup });
  },
  saveConnection() {
    const url = `${baseUrl}save-connection/`;
    return instance.post(url);
  },
};

export default users;
