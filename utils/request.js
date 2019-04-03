import axios from "axios"

export const sendGet = (url, params) => {
  let promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
      params
    })
      .then(res => resolve(res))
      .catch(error => reject(error))
  })
  return promise
} 