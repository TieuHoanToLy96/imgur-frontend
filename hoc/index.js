import Head from "next/head"
import { authAccount } from "/pages/account/actions"
import { store } from "/redux/store"

export default (ChildComponent) => {
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
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>  
          </Head>
          <ChildComponent {...this.props} />
        </div>
      )
    }
  }
  return (Hoc)
}

