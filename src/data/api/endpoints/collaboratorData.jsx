import instance from '../instance';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'collaborator-data/';

const collaboratorData = {
  list(kpi, start, end, options = {}) {
    let url = `${baseUrl}`;
    const { abortController, ...filters } = options;
    const searchParams = {
      kpi,
      start,
      end,
      ...filters,
    };
    return instance.get(appendSearchParams(url, searchParams), {
      signal: abortController?.signal,
    });
  },
  export(kpi, filter = {}) {
    const url = `${baseUrl}export`;
    const searchParams = {
      kpi,
      ...filter,
    };
    return instance.get(appendSearchParams(url, searchParams));
  },
  excel_export(kpi, filter = {}) {
    const url = `${baseUrl}excel-export`;
    const searchParams = {
      kpi,
      ...filter,
    };
    return instance.get(appendSearchParams(url, searchParams));
  },
  bulkUpdate(data) {
    const url = `${baseUrl}bulk-update/`;
    return instance.put(url, data);
  },
  addResult(data) {
    const url = `${baseUrl}add-result/`;
    return instance.post(url, data);
  },
};

export default collaboratorData;
