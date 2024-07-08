import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ROUTER_URL,
});
instance.interceptors.response.use(undefined, (error) => {
  return { error };
});

export default instance;
