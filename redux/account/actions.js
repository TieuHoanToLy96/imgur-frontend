import axios from "axios"
import { Cookies } from 'react-cookie'
import produce from "immer"
import { findIndex } from "lodash"

import io from 'socket.io-client'
const dev = process.env.node_env !== 'production'
const socket = io(dev ? "http://localhost:4000" : "https://tieuhoan.dev")

import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"
import { sendGet, sendPost } from "/utils/request"

const cookies = new Cookies()

export const authAccount = token => {
  let data = { token: token }
  const url = `${getHostName()}/api/v1/account/me?accessToken=${token}`
  return axios({
    method: "post",
    url,
    data
  })
}

export const createAccount = data => {
  return dispatch => {
    const url = `${getHostName()}/api/v1/account/create`

    let promise = new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data
      })
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            cookies.set("jwt", res.data.data.token)
            dispatch(setAccount(res.data.data.account))
            Notification.success(res.data.message || "Tạo tài khoản thành công")
          } else {
            dispatch({
              type: "ACCCOUNT::CREATE_ACCOUNT_FAILED"
            })
            Notification.errorNonStrict(res, "Xảy ra lỗi khi tạo tài khoản")
          }
          resolve(res)
        })
        .catch(error => {
          Notification.errorStrict(error, "Xảy ra lỗi khi tạo tài khoản")
          reject(error)
        })
    })
    return promise
  }
}

export const logIn = data => {
  return dispatch => {
    const url = `${getHostName()}/api/v1/account/sign_in`
    let promise = new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data
      })
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            cookies.set("jwt", res.data.token)
            dispatch(setAccount(res.data.account))
          } else {
            dispatch({
              type: "ACCOUNT::SIGN_IN_FAILED"
            })
            Notification.errorNonStrict(res, "Đăng nhập thất bại")
          }
          resolve(res)
        })
        .catch(error => {
          Notification.errorStrict(error, "Đăng nhập thất bại")
          reject(error)
        })
    })
    return promise
  }
}

export const logOut = () => {
  return dispatch => {
    cookies.set("jwt", "")
    dispatch(setAccount(null))
  }
}

export const updateAccount = data => {
  const url = `${getHostName()}/api/v1/account/update`
  return (dispatch, getState) => {
    return sendPost(url, {}, { account: data })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setAccount(res.data.data.account))
          dispatch(setUser(res.data.data.account))

          Notification.success(res.data.message || "Cập nhật tài khoản thành công")
        } else {
          dispatch({
            type: "ACCOUNT::UPDATE_ACCOUNT_FAILED"
          })
          Notification.errorNonStrict(res, "Cập nhật tài khoản thất bại")
        }

        return res.data.success
      })
      .catch(error => {
        Notification.errorStrict(error, "Cập nhật tài khoản thất bại")
      })
  }
}

export const setAccount = account => {
  return ({
    type: "ACCOUNT::SET_ACCOUNT",
    payload: account
  })
}

export const setUser = user => {
  return ({
    type: "ACCOUNT::SET_USER",
    payload: user
  })
}

export const getUser = accountUrl => {
  const url = `${getHostName()}/api/v1/account/get_user?account_url=${accountUrl}`
  return dispatch => {
    return sendGet(url)
      .then(res => {
        console.log(res)
        if (res.status == 200 && res.data.success == true) {
          dispatch(setUser(res.data.user))
        } else {

        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Get user failed failed")
      })
  }
}

export const sendFriendRequest = data => {
  let url = `${getHostName()}/api/v1/account/send_friend_request`

  return (dispatch, getState) => {
    return sendPost(url, null, data)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          Notification.success(res.data.message)
          console.log(res, "resss")
          dispatch(setUser(produce(getState().account.user, draft => {
            draft.relation_account.status = 1
            return draft
          })))
          socket.emit("notification", { accountId: res.data.data.receiver.id, notification: res.data.data })
        } else {
          Notification.errorNonStrict(res, "Gửi lời mời thất bại, thử lại sau")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Gửi lời mời thất bại, thử lại sau")
      })
  }
}

export const acceptFriendRequest = data => {
  let url = `${getHostName()}/api/v1/account/accept_friend_request`

  return (dispatch, getState) => {
    return sendPost(url, null, data)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          let account = getState().account.info
          let indexNoti = findIndex(account.notifications, el => el.id == res.data.data.id)
          if (indexNoti > -1) {
            dispatch(setAccount(produce(account, draft => {
              draft.notifications[indexNoti] = res.data.data
            })))
          }
          Notification.success(res.data.message)
        } else {
          Notification.errorNonStrict(res, "Đồng ý kết bạn thất bại, thử lại sau")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Đồng ý kết bạn thất bại, thử lại sau")
      })
  }
}

export const cancelFriendRequest = data => {
  let url = `${getHostName()}/api/v1/account/cancel_friend_request`

  return (dispatch, getState) => {
    return sendPost(url, null, data)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          let account = getState().account.info
          let indexNoti = findIndex(account.notifications, el => el.id == res.data.data.id)
          if (indexNoti > -1) {
            dispatch(setAccount(produce(account, draft => {
              draft.notifications[indexNoti] = res.data.data
            })))
          }
          Notification.success(res.data.message)
        } else {
          Notification.errorNonStrict(res, "Huỷ lời mời kết bạn thất bại, thử lại sau")
        }
      })
      .catch(error => {
        Notification.errorStrict(error, "Huỷ lời mời kết bạn thất bại, thử lại sau")
      })
  }
}

export const markSeenNotification = notificationId => {
  let url = `${getHostName()}/api/v1/account/seen_notification`

  return (dispatch, getState) => {
    return sendPost(url, null, { id: notificationId })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          let account = getState().account.info

          let indexNoti = findIndex(account.notifications, el => el.id == res.data.data.id)
          if (indexNoti > -1) {
            dispatch(setAccount(produce(account, draft => {
              draft.notifications[indexNoti] = res.data.data
            })))
          }
        }

        return res
      })
  }
}

export const getNotifications = () => {
  return (dispatch, getState) => {
    let url = `${getHostName()}/api/v1/account/get_notifications`
    return sendGet(url)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          let account = getState().account.info
          dispatch(setAccount(produce(account, draft => {
            draft.notifications = res.data.data.notifications
          })))
        }
      })
  }
}

export const socketUpdateNoti = data => {
  return (dispatch, getState) => {
    console.log(getState(), "store")
    let account = getState().account.info
    let notifications = account.notifications || []
    notifications = [data.notification].concat(notifications)

    dispatch(setAccount(produce(account, draft => {
      draft.notifications = notifications
    })))
    dispatch(setCountNoti(getState().account.countNoti + 1))
    Notification.success(`${data.notification.sender.user_name} ${data.notification.content}`)
  }
}

export const setCountNoti = data => {
  return {
    type: "ACCOUNT::SET_COUNT_NOTI",
    payload: data
  }
}
