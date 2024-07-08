import instance from '../instance';

const baseUrl = 'mails/';

const mails = {
  requestEvolution(request) {
    const url = `${baseUrl}request-evolution/`;
    return instance.post(url, request);
  },
};

export default mails;
