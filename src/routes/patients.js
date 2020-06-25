const express = require('express')
const { connection } = require('../../config')

const Router = express.Router()

Router.get('/:id/messages', (req, res) => {
  const values = [
    patientId = req.params.id,
    doctorId = req.body.doctorId
  ]
  const sql = 'SELECT message.message, message.creation_date, message.mood_status FROM message JOIN patient ON message.patient_id = patient.id JOIN doctor ON message.doc_id = doctor.id WHERE 1 = 1 AND patient.id = ? AND doctor.id = ? ORDER BY creation_date DESC'

  connection.query(sql, values, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

module.exports = Router