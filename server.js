const express = require('express')
const cookieParser = require('cookie-parser')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 4000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())

  const authAccount = (req, res, next) => {
    jwt = req.cookies.jwt
    if (!jwt) {
      res.redirect("/")
    } else {
      next()
    }
  }

  server.get("/posts/new", (req, res) => {
    return app.render(req, res, `/posts/edit`, { isCreatePost: true })
  })

  server.get("/posts/:postId", (req, res) => {
    return app.render(req, res, `/posts/show`, { postId: req.params.postId })
  })
  server.get("/posts/:postId/edit", (req, res) => {
    return app.render(req, res, `/posts/edit`, { postId: req.params.postId, isCreatePost: true })
  })
  server.get("/account/:account_url/:key", (req, res) => {
    return app.render(req, res, `/account/${req.params.key}`, { accountUrl: req.params.account_url, key: req.params.key })
  })
  server.get("/account/hlogin", (req, res) => handle(req, res))
  server.get("/account/info", authAccount, (req, res) => handle(req, res))
  server.get("/account/sign-in", (req, res) => handle(req, res))
  server.get("/account/sign-up", (req, res) => handle(req, res))
  server.get("/", (req, res) => handle(req, res))
  server.get('*', (req, res) => handle(req, res))
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running on http://localhost:${port}`)
  })
})
