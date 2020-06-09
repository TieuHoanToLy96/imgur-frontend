import axios from "axios"

import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"
import { sendGet, sendPost } from "/utils/request"

import io from 'socket.io-client'
const socket = io('http://localhost:4000')

export const createOrUpdatePost = (accountId, params) => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/article/create_or_update?account_id=${accountId}`
    return sendPost(url, null, { article: params })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setEditPost(res.data.article))
          Notification.success("Lưu bài viết thành công")
        } else {
          Notification.errorNonStrict(res, "Lưu bài viết thất bại")
        }
        return res
      })
      .catch(error => {
        Notification.errorStrict(error, "Lưu bài viết thất bại")
      })
  }
}

export const getPost = (postId, accountId) => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/article/show?account_id=${accountId}&article_id=${postId}`
    return sendGet(url)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setEditPost(res.data.article))
        } else {
          Notification.errorNonStrict(res, "Lấy danh sách bài viết thất bại")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Lấy danh sách bài viết thất bại")
      })
  }
}

export const getPostsUser = params => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/article/search`
    return sendGet(url, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setPosts(res.data.data.articles))
        } else {
          Notification.errorNonStrict(res, "Lấy bài viết thất bại")
        }
        return res
      })
      .catch(error => {
        Notification.errorStrict(error, "Lấy bài viết thất bại")
      })
  }
}

export const createOrUpdateComment = (accountId, params, cb) => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/comment/create_or_update?account_id=${accountId}`
    return sendPost(url, null, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          socket.emit("notification", { accountId: res.data.data.notification.receiver.id, notification: res.data.data.notification, countNoti: res.data.data.count_noti })
          dispatch(setComment(res.data.data.comment))
          if (cb) cb()
        } else {
          Notification.errorNonStrict(res, "Lưu bình luận thất bại")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Lưu bình luận thất bại")
      })
  }
}

export const createOrUpdateReaction = (accountId, params, cb) => {
  return (dispatch, getState) => {
    let url = `${getHostName()}/api/v1/reaction/create_or_update?account_id=${accountId}`
    return sendPost(url, null, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          if (res.data.data.notification) {
            socket.emit("notification", { accountId: res.data.data.notification.receiver.id, notification: res.data.data.notification, countNoti: res.data.data.count_noti })
          }

          dispatch(setReaction(res.data.data.reaction))

          if (cb) cb()
        } else {
          Notification.errorNonStrict(res, "Bày tỏ cảm xúc thất bại")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Bày tỏ cảm xúc thất bại")
      })
  }
}

export const getComments = (accountId, articleId, params) => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/comment/list?account_id=${accountId}`

    return sendGet(url, { ...params, account_id: accountId, article_id: articleId })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setComments(res.data.data))
        } else {
          Notification.errorNonStrict(res, "Lưu bình luận thất bại")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Lưu bình luận thất bại")
      })
  }
}

export const setReaction = value => {
  return ({
    type: "POST::SET_REACTION",
    payload: value
  })
}

export const setComment = value => {
  return ({
    type: "POST::SET_COMMENT",
    payload: value
  })
}

export const setComments = value => {
  return {
    type: "POST::SET_COMMENTS",
    payload: value
  }
}

export const setEditPost = value => {
  return ({
    type: "POST::SET_EDIT_POST",
    payload: value
  })
}

export const setPosts = value => {
  return {
    type: "POST::SET_POSTS",
    payload: value
  }
}