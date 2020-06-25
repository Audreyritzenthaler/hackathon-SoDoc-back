const express = require('express')
const { port } = require('./config')
const routes = require('./src/routes/index')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/authentification', routes.authentification)
app.use('/api/patients', routes.patients)
app.use('/api/doctors', routes.doctors)

app.listen(port, (err) => {
  if (err) throw err
  console.log(`server listening on ${port}`)
})