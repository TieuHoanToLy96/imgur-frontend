import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"
import { sendGet, sendPost } from "/utils/request"

export const setToken = token => {
  return {
    type: "INDEX::SET_TOKEN",
    payload: token
  }
}

export const getAllArticle = () => {
  let url = `${getHostName()}/api/v1/all_articles`
  let params = {}
  return dispatch => {
    return sendGet(url, params, null, false)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch({
            type: "INDEX::SET_ALL",
            payload: res.data.data
          })
        } else {
          Notification.errorNonStrict(res, "Xảy ra lỗi lấy bài viết")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Xảy ra lỗi lấy bài viết")
      })
  }
}

export const search = (params, cb) => {
  let url = `${getHostName()}/api/v1/search`
  return dispatch => {
    return sendGet(url, params)
      .then(res => {
        console.log(res)
        if (res.status == 200 && res.data.success == true) {
          dispatch({
            type: "INDEX::SET_POST",
            payload: res.data.data.article
          })

          dispatch({
            type: "INDEX::SET_ACCOUNT",
            payload: res.data.data.account
          })
        } else {
          Notification.errorNonStrict(res, "Tìm kiếm thất bại")
        }

        return res
      })
      .catch(error => {
        Notification.errorStrict(error, "Tìm kiếm thất bại")
      })
      .finally(() => {
        if (cb) cb()
      })
  }
}

export const getAllStory = (params, cb) => {
  let url = `${getHostName()}/api/v1/all_story`
  return sendGet(url, params, null, false)
    .then(res => {
      if (res.status == 200 && res.data.success == true) {
        cb(res.data.data)
      }
    })
}