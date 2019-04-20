import axios from "axios"
import Cookies from "js-cookie"

import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"

export const authAccount = token => {
  return dispatch => {
    let data = {token: token}
    const url = `${getHostName()}/api/v1/account/me?accessToken=${token}`
    let promise = new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data
      })
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            dispatch({
              type: "ACCOUNT::SIGN_IN_SUCCESS",
              payload: res.data.data
            })
          } else {
            dispatch({
              type: "ACCOUNT::SIGN_IN_FAILED"
            })
          }
          resolve(res)
        })
        .catch(error => {
          Notification.errorStrict(error)
          reject(error)
        })
    })
    return promise
  }
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
            dispatch({
              type: "ACCOUNT::CREATE_ACCOUNT_SUCCESS",
              payload: res.data.data
            })
            Notification.success(res.data.message || "Tạo tài khoản thành công")
          } else {
            dispatch({
              type: "ACCCOUNT::CREATE_ACCOUNT_FAILED"
            })
            Notification.error(res.data.message || "Xảy ra lỗi khi tạo tài khoản")
          }
          resolve(res)
        })
        .catch(error => {
          Notification.errorStrict(error)
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
            localStorage.setItem("jwt", res.data.token)
            Cookies.set("jwt", res.data.token, { expired: 30 })

            dispatch({
              type: "ACCOUNT::SIGN_IN_SUCCESS",
              payload: res.data.account
            })
          } else {
            dispatch({
              type: "ACCOUNT::SIGN_IN_FAILED"
            })
            Notification.error(res.data.message || "Đăng nhập thất bại")
          }
          resolve(res)
        })
        .catch(error => {
          Notification.errorStrict(error)
          reject(error)
        })
    })
    return promise
	}
}
