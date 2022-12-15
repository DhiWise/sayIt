import Axios from "axios";
import { SupabaseCredentials } from "constants/Constant";
const defaultAxios = Axios.create({
  headers: {

    "WWW-Authenticate": SupabaseCredentials.Authorization,
    Authorization: SupabaseCredentials.Authorization,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    apikey:SupabaseCredentials.ApiKey
  
},
});
defaultAxios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function apiClient(method, url, options = {}) {
  const { data = {}, headers = {}, params = {}, ...rest } = options;
  return defaultAxios({
    url,
    data,
    method,
    params,
    headers,
    ...rest,
  });
}

export const apis = {
  get: (url, args) => apiClient("get", url, args),
  post: (url, args) => apiClient("post", url, args),
  put: (url, args) => apiClient("put", url, args),
  patch: (url, args) => apiClient("patch", url, args),
  delete: (url, args) => apiClient("delete", url, args),
};
