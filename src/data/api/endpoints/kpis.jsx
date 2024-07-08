import instance from '../instance';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'kpis/';

const kpis = {
  collaboratorData(id, start, end, options = {}) {
    const url = `${baseUrl}${id}/collaborator-data/`;
    const { abortController, ...filters } = options;
    const searchParams = {
      start,
      end,
      ...filters,
    };

    return instance.get(appendSearchParams(url, searchParams), {
      signal: abortController?.signal,
    });
  },
  detail(id) {
    const url = `${baseUrl}${id}/`;
    return instance.get(url);
  },
  list() {
    return instance.get(baseUrl);
  },
  create(kpi) {
    return instance.post(baseUrl, kpi);
  },
  update(id, isActive, params) {
    const url = `${baseUrl}${id}/`;
    const data = params ? { isActive, params } : { isActive };
    return instance.patch(url, data);
  },
};

export default kpis;
