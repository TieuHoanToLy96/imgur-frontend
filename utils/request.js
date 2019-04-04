import axios from "axios";
const { CancelToken } = axios;

export const sendGet = (url, params, _token) => {
  let token;

  if (!_token) token = localStorage.getItem("jwt");
  else token = _token;

  let cancel;
  let promise = new Promise((resolve, reject) => {
    if (token) {
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

  if (!_token) token = localStorage.getItem("jwt");
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
  if (!_token) token = localStorage.getItem("jwt");
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

  if (!_token) token = localStorage.getItem("jwt");
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
