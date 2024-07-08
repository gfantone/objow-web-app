import instance from '../instance';
import {buildEndpointUrlWithParams} from '../utils';

const baseUrl = 'hierarchy-nodes/';

const hierarchyNodes = {
    list(type, page) {
        const params = {};
        if (type) params.type = type;
        if (page) params.page = page;

        const url = buildEndpointUrlWithParams(baseUrl, '', params);

        return instance.get(url);
    },
};

export default hierarchyNodes;
