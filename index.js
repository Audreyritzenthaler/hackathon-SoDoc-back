const express = require('express')
const { port } = require('./config')

const app = express()

app.listen((err) => {
  if (err) throw err
  console.log(`server listening on ${port}`)
})