import axios from "axios";
import { Cookies } from "react-cookie"
const { CancelToken } = axios;

const cookies = new Cookies()

export const sendGet = (url, params, _token, auth = true) => {
  let token;

  if (!_token) token = cookies.get("jwt")
  else token = _token;

  let cancel;
  let promise = new Promise((resolve, reject) => {
    if (token || !auth) {
      axios({
        method: "get",
        url,
        params,
        headers: {
          Authorization: `Bearer ${token}`
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    } else reject({ internal_error: "Thiếu access token!" });
  });
  promise.cancel = cancel;
  return promise;
};

export const sendPost = (url, params, data, _token) => {
  let token;

  if (!_token) token = cookies.get("jwt")
  else token = _token;

  let cancel;
  let promise = new Promise((resolve, reject) => {
    if (token)
      axios({
        method: "post",
        url,
        data: data,
        params,
        // baseURL: "localhost:8060",
        headers: {
          Authorization: `Bearer ${token}`
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    else reject({ internal_error: "Thiếu access token!" });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendPut = (url, params, data, _token) => {
  let token;
  if (!_token) token = cookies.get("jwt")
  else token = _token;

  let cancel;
  let promise = new Promise((resolve, reject) => {
    if (token)
      axios({
        method: "put",
        url,
        params,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*"
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    else reject({ internal_error: "Thiếu access token!" });
  });

  promise.cancel = cancel;
  return promise;
};

export const sendDelete = (url, params, _token) => {
  let token;

  if (!_token) token = cookies.get("jwt")
  else token = _token;

  let cancel;
  let promise = new Promise((resolve, reject) => {
    if (token)
      axios({
        method: "delete",
        url,
        params,
        headers: {
          Authorization: `Bearer ${token}`
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    else reject({ internal_error: "Thiếu access token!" });
  });
  promise.cancel = cancel;
  return promise;
};
