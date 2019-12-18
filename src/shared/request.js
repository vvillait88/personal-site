/**
 *  Axios wraper
 *
 *  Options: {
 *      url : access url
 *      method: request type (post, get, put...)
 *      params: body object for post and puts
 *      query: query for get requets
 *  }
 *
 *
 *  Throws error when either a method or url is not defined
 *
 */

import Axios from 'axios';

import Cookies from './cookies';

export default function request(options, cb = (e, d) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.error('No Callback method');
    // console.error(e);
  }
}) {
  try {
    const axiosOptions = {
      baseURL : process.env.API_URL,
      headers : {
        'Content-Type': 'application/json',
      }
    };
    const jwt = Cookies.get('jwt');
    if (jwt) {
      axiosOptions.headers.Authorization = `Bearer ${jwt}`;
    } else {
      axiosOptions.headers.apikey = process.env.APP_API_KEY;
      axiosOptions.headers.apisecret = process.env.APP_API_SECRET;
    }
    const axios = Axios.create(axiosOptions);
    if (!options.method) {
      throw Error((new Error('Method type must be set.')));
    }
    if (!options.url) {
      throw Error((new Error('Url must be set.')));
    }
    if (!options.params) {
      options.params = {};
    }
    if (!options.query) {
      options.query = {};
    }
    axios({
      method : options.method,
      url    : options.url,
      params : options.query,
      data   : options.params
    }).then((res) => {
      const data = res.data.data ? res.data.data : res.data;
      cb(null, data);
    }).catch((error) => {
      cb(error.response, null);
    });
  } catch (e) {
    cb(e, null);
  }
}
