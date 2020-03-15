import axios from "axios"
//import Cookies from "js-cookie"
import { Cookies } from 'react-cookie'

import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"

const cookies = new Cookies()

export const authAccount = token => {
  return dispatch => {
    let data = { token: token }
    const url = `${getHostName()}/api/v1/account/me?accessToken=${token}`
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
          return {token}
        } else {
          dispatch({
            type: "ACCOUNT::SIGN_IN_FAILED"
          })

          return {}
        }
      })
      .catch(error => {
        return {}
      })
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
            //localStorage.set("jwt", res.data.token)
            //Cookies.set("jwt", res.data.token, { expired: 30 })
            cookies.set("jwt", res.data.token)
            dispatch({
              type: "ACCOUNT::SIGN_IN_SUCCESS",
              payload: res.data.account
            })
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
