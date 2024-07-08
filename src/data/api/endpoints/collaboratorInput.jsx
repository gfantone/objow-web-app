import instance from '../instance';
import { appendSearchParams } from '../../../helpers/UrlHelper';

const baseUrl = 'collaborator-input/';

const collaboratorInput = {
  list(kpi, start, end, options = {}) {
    let url = `${baseUrl}`;
    const { abortController, ...filter } = options;
    const searchParams = {
      kpi,
      start,
      end,
      ...filter,
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
  create(input) {
    const url = `${baseUrl}`;
    return instance.post(url, input);
  },
  bulkUpdate(data) {
    const url = `${baseUrl}bulk-update/`;
    return instance.put(url, data);
  },
  update(data) {
    const url = `${baseUrl}`;
    return instance.patch(url, data);
  },
};

export default collaboratorInput;
