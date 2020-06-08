const axios = require('axios');
const dev = process.env.NODE_ENV !== 'production'

const getHostName = () => {
  if (dev) {
    return "http://localhost:8000"
  }
  return "https://api.tieuhoan.dev"
}

const authAccount = (req, res, next) => {
  jwt = req.cookies.jwt
  if (!jwt) {
    res.redirect("/")
  } else {
    const url = `${getHostName()}/api/v1/account/me?accessToken=${jwt}`
    let data = { token: jwt }
    axios({
      method: "post",
      url,
      data
    }).then(res => {
      if (res.status == 200 && res.data.success == true) {
        next()
      } else {
        res.redirect("/")
      }
    }).catch(() => res.redirect("/"))
  }
}
module.exports = {
  authAccount
}