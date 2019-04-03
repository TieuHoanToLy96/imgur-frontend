import Head from "next/head"

export default (ChildComponent) => {
  class Hoc extends React.Component {
    static async getInitialProps(ctx) {
      return null
    }

    render() {
      return (
        <div>
          <Head>
            <title>Imgur</title>
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

