'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const routes = require('./routes/') // same as ./routes/index.js
const { connect } = require('./database')

const app = express()

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// middlewares
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  const timeStamp = new Date()
  console.log(`[${timeStamp}] "${chalk.cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// Error handling middleware
app.use((err, { method, url, headers: { 'user-agent': agent } }, res, next) => {
  res.sendStatus(err.status || 500)

  const timeStamp = new Date()
  const statusCode = res.statusCode
  const statusMessage = res.statusMessage

  console.error(
    `[${timeStamp}] "${chalk.red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
  )
  console.error(err.stack)
})


// Listen to requests on the provided port and log when available
connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
