import axios from "axios"

import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"
import { sendGet, sendPost } from "/utils/request"

export const createOrUpdatePost = (accountId, params) => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/article/create_or_update?account_id=${accountId}`
    return sendPost(url, null, { article: params })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setEditPost(res.data.article))
          Notification.success("Save post success")
        } else {
          Notification.errorNonStrict(res, "Save post failed")
        }
        return res
      })
      .catch(error => {
        Notification.errorStrict(error, "Save post failed")
      })
  }
}

export const getPost = (postId, accountId) => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/article/show?account_id=${accountId}&article_id=${postId}`
    sendGet(url)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setEditPost(res.data.article))
        } else {
          Notification.errorNonStrict(res, "Get post failed")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Get post failed")
      })
  }
}

export const setEditPost = value => {
  return ({
    type: "POST::SET_EDIT_POST",
    payload: value
  })
}