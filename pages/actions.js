import {sendGet} from "../utils/request"

export const setToken = token => {
  return {
    type: "INDEX::SET_TOKEN",
    payload: token
  }
}

export const getAllArticle = () => {
  let url = "http://localhost:8000/api/v1/article/all"
  let params = {}
  return sendGet(url, params)
  .then(res => {
    console.log(res)

  })
  .catch(error => console.log(error))
}