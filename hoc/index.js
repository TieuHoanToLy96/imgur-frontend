import Head from "next/head"
import axios from "axios"

import Header from "/components/Header/index"
import { authAccount } from "/pages/account/actions"
import { getHostName } from "/utils/tools"
import "/static/style/main.scss"

export default (ChildComponent, isHiddenHeader = false) => {
  class Hoc extends React.Component {
    static async getInitialProps(ctx) {
      let token = null
      if (ctx.isServer) {
        token = ctx.req.cookies.jwt
        if (token) {
          let dispatch = ctx.store.dispatch

          let data = { token: token }
          const url = `${getHostName()}/api/v1/account/me?accessToken=${token}`
          await axios({
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
                return {token: token}
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
      return {token: token}
    }

    render() {
      return (
        <div>
          <Head>
            <title>Imgur</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link href="/static/css/antd.min.css" rel='stylesheet' />
            <link rel="shortcut icon" type="image/png" href="/static/image/favicon/favicon.ico"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"/>  
          </Head>
          {
            !isHiddenHeader && <Header {...this.props}/>
          }
          <ChildComponent {...this.props} />
        </div>
      )
    }
  }
  return (Hoc)
}

