const express = require('express')
const cookieParser = require('cookie-parser')
const next = require('next')
const http = require("http")
const socket = require("socket.io")
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 4000
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const Auth = require("./auth/index")

const server = express()
server.use(cookieParser())

const serverIO = http.Server(server);
var io = socket(serverIO);

io.on("connection", function (socket) {
  socket.on("notification", data => {
    io.emit(`noti:${data.accountId}`, data)
  });

  socket.on("conversation", data => {
    io.emit(`con:${data.conversationId}`, data)
  })
})

nextApp.prepare().then(() => {
  server.get("/posts/new", (req, res) => {
    return nextApp.render(req, res, `/posts/edit`, { isCreatePost: true })
  })

  server.get("/conversations", Auth.authAccount, (req, res) => {
    return nextApp.render(req, res, `/conversations`, {})
  })

  // server.get("/conversations/:conversationId", Auth.authAccount, (req, res) => {
  //   return nextApp.render(req, res, `/conversations`, { conversationId: req.params.conversationId })
  // })

  server.get("/posts/:postId", (req, res) => {
    return nextApp.render(req, res, `/posts/show`, { postId: req.params.postId })
  })
  server.get("/posts/:postId/edit", (req, res) => {
    return nextApp.render(req, res, `/posts/edit`, { postId: req.params.postId, isCreatePost: true })
  })
  server.get("/account/:account_url/:key", (req, res) => {
    return nextApp.render(req, res, `/account/${req.params.key}`, { accountUrl: req.params.account_url, key: req.params.key })
  })
  server.get("/account/hlogin", (req, res) => handle(req, res))
  server.get("/account/info", Auth.authAccount, (req, res) => handle(req, res))
  server.get("/account/sign-in", (req, res) => handle(req, res))
  server.get("/account/sign-up", (req, res) => handle(req, res))
  server.get("/", (req, res) => handle(req, res))
  server.get('*', (req, res) => handle(req, res))
  serverIO.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running on http://localhost:${port}`)
  })
})
