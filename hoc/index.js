import Head from "next/head"

export default (ChildComponent) => {
  class Hoc extends React.Component {
    static async getInitialProps(ctx) {
      if (ctx.isServer) {
        console.log(ctx, "CONTEXfffqqT")
      }
     
      return null
    }

    render() {
      return (
        <div>
          <Head>
            <title>Imgur</title>
            <link href="../static/css/antd.min.css" rel='stylesheet' />
          </Head>

          <ChildComponent {...this.props} />
        </div>
      )
    }

  }
  return (Hoc)
}

