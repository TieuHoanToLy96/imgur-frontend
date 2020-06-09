import { useEffect } from "react"
import { Cookies } from "react-cookie"
import { connect } from "react-redux"
import Router from "next/router"

import { authAccount, setAccount } from "/redux/account/actions"

const cookies = new Cookies()

const HLogin = props => {
  useEffect(() => {
    let token = window.location.search.substr(1)
    console.log(token, "token")
    if (token) {
      authAccount(token)
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            console.log(res)
            cookies.set("jwt", token)
            Router.push("/account/info")
          } else {
            Router.push("/")
          }
        })
        .catch(e => {
          console.log(e)
          Router.push("/")
        })
    }
  }, [])
  return null
}

export default connect(null, { setAccount })(HLogin)