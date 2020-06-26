const express = require('express')
const { connection } = require('../../config')

const Router = express.Router()

Router.get('/:id', (req, res) => {
  const values = [
    patientId = req.params.id,
    doctorId = req.query.doctorId
  ]
  const sql = 'SELECT DISTINCT doctor.lastname, doctor.firstname, doctor.lastname, doctor.email, doctor.phoneNumber, doctor.specialities, doctor.adress, doctor.codePostal, doctor.city FROM doctor JOIN message ON message.doc_id = doctor.id WHERE 1=1 AND message.patient_id = ? AND message.doc_id = ?'

  connection.query(sql, values, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

Router.get('/:id/messages', (req, res) => {
  const values = [
    patientId = req.params.id,
    doctorId = req.query.doctorId
  ]
  const sql = 'SELECT message.message, message.creation_date, message.mood_status FROM message JOIN patient ON message.patient_id = patient.id JOIN doctor ON message.doc_id = doctor.id WHERE 1 = 1 AND patient.id = ? AND doctor.id = ? ORDER BY creation_date DESC'

  connection.query(sql, values, (err, result) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

Router.post('/:id/messages', (req, res) => {
  console.log(req.params, req.body)
  const values = [
    patientId = req.params.id,
    doctorId = req.body.doctorId,
    message = req.body.message,
    mood_status = req.body.mood_status
  ]
  const sql = 'INSERT INTO message (patient_id, doc_id, message, mood_status) VALUES (?,?,?,?)'
  connection.query(sql, values, (err) => {
    if (err) throw err
    const time = new Date().toISOString().replace('T', ' ').substr(0, 19)
    values.push(time)
    res.status(200).send({message: req.body.message, mood_status: req.body.mood_status, creation_date: time })
  })
})

module.exports = Router