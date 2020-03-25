import axios from "axios"
//import Cookies from "js-cookie"
import { Cookies } from 'react-cookie'

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
  return dispatch => {
    return sendPost(url, {}, { account: data })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch(setAccount(res.data.data.account))
          Notification.success(res.data.message || "Update account success")
        } else {
          dispatch({
            type: "ACCOUNT::UPDATE_ACCOUNT_FAILED"
          })
          Notification.errorNonStrict(res, "Update account failed")
        }

        return res.data.success
      })
      .catch(error => {
        Notification.errorStrict(error, "Update account failed")
      })
  }
}

export const setAccount = account => {
  return ({
    type: "ACCOUNT::SET_ACCOUNT",
    payload: account
  })
} 
