const express = require('express')

const Router = express.Router

Router.get('/', (req, res) => {
  res.send(200).send('Hello')
})

module.exports = Router