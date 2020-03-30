import Head from "next/head"

export default (ChildComponent) => {
  class LayoutGuest extends React.Component {
    render() {
      return (
        <div>
          <Head>
            <title>Imgur</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="/static/css/antd.min.css" rel='stylesheet' />
            <link rel="shortcut icon" type="image/png" href="/static/image/favicon/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
          </Head>
          <Header {...this.props} />
          <ChildComponent {...this.props} />
        </div>
      )
    }
  }

  return LayoutGuest
}