import Head from "next/head"

import Header from "/components/Header/index"
import { authAccount } from "/pages/account/actions"
import "/static/style/main.scss"

export default (ChildComponent, isHiddenHeader = false) => {
  class Hoc extends React.Component {
    static async getInitialProps(ctx) {
      let token = null
      if (ctx.isServer) {
        token = ctx.req.cookies.jwt
        if (token) {
          await ctx.store.dispatch(authAccount(token))
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

