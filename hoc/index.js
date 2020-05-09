import Head from "next/head"
import axios from "axios"
import { Cookies } from 'react-cookie'

import Header from "/components/Header/index"
import { getHostName } from "/utils/tools"
import "/static/style/main.scss"

const cookies = new Cookies()
export default (ChildComponent, isHiddenHeader = false) => {
  class Hoc extends React.Component {
    static async getInitialProps(ctx) {
      let token = null
      if (ctx.isServer) {
        if (ctx.req) {
          token = ctx.req.cookies.jwt
        } else {
          token = cookies.get("jwt")
        }

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
                return { token: token, query: ctx.query }
              } else {
                dispatch({
                  type: "ACCOUNT::SIGN_IN_FAILED"
                })
                return { query: ctx.query }
              }

            })
            .catch(error => {
              console.log(error)
              return { query: ctx.query }
            })
        }

        return { query: ctx.query }
      }
      return { query: ctx.query }
    }

    render() {
      return (
        <div>
          <Head>
            <title>Imgur</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="/static/css/antd.min.css" rel='stylesheet' />
            <link href="/static/css/emoji-mart.css" rel='stylesheet' />
            <link rel="shortcut icon" type="image/png" href="/static/image/favicon/favicon.ico" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
            <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
          </Head>
          {
            !isHiddenHeader && <Header {...this.props} />
          }
          <ChildComponent {...this.props} />
        </div>
      )
    }
  }
  return (Hoc)
}

