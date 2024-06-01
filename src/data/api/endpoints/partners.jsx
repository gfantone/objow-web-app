import instance from '../instance';

const baseUrl = 'partners/';

const partners = {
  aircallRedirectUri() {
    const url = `${baseUrl}aircall-redirect-uri/`;
    return instance.get(url);
  },
  oauthAutorizeUrl() {
    const url = `oauth/authorize/?base_url=${window.location.origin}`;

    return instance.get(url);
  },
  oauthToken(code) {
    const url = `oauth/token/?code=${code}&base_url=${window.location.origin}`;

    return instance.get(url);
  },

  workosToken(code) {
    const url = `workos/token/?code=${code}&base_url=${window.location.origin}`;

    return instance.get(url);
  },
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  kpis(id) {
    const url = `${baseUrl}${id}/kpis/`;
    return instance.get(url);
  },
  list() {
    return instance.get(baseUrl);
  },
  panopli_url() {
    const url = `${baseUrl}panopli_url/`;
    return instance.get(url);
  },
};

export default partners;
