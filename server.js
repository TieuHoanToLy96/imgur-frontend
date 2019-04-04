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

  server.get("/account/sign-in", (req, res) => handle(req, res))
  server.get("/account/sign-up", (req, res) => handle(req, res)) 
  server.get("/", (req, res) => handle(req, res))
	server.get('*', (req, res) => handle(req, res))

	server.listen(port, (err) => {
		if (err) throw err
		console.log(`Server is running on http://localhost:${port}`)
	})
})
