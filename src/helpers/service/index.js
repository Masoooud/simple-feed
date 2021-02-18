import Axios from 'axios';
import config from './config';

const defaultOptions = {
  headers: {},
};

class Api {
  _token = 'd06c5b99868a4082b819b789ccd8dbe9';
  static instance;

  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
    });
  }

  static getInstance = () => {
    if (!Api.instance && !(Api.instance instanceof Api)) {
      Api.instance = new Api();
    }
    return Api.instance;
  };

  buildHeaders = (headersOption) => {
    const headers = {
      Authorization: `${config.tokenType} ${this._token || cookie.get('Token') || ''}`,
      ...headersOption,
    };
    console.log({ headers });

    return headers;
  };

  axios = (method, url, data, options) => {
    const { headers = {}, ...others } = options;
    const otherOptions = method === 'GET' ? { params: data, ...others } : { data, ...others };
    return this.axiosInstance({
      method,
      url,
      headers: this.buildHeaders(headers),
      ...otherOptions,
    });
  };

  get = async (path, params, options = defaultOptions) => {
    return await this.axios('GET', path, params, options);
  };
  post = async (path, body, options = defaultOptions) => {
    return await this.axios('POST', path, body, options);
  };
  put = async (path, body, options = defaultOptions) => {
    return await this.axios('PUT', path, body, options);
  };
  delete = async (path, options = defaultOptions) => {
    return await this.axios('DELETE', path, undefined, options);
  };
}

export default Api.getInstance();
