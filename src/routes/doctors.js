const express = require('express')
const { connection } = require('../../config')
const Router = express.Router()

Router.get('/:id/messages', (req, res) => {
	const idDoctor = req.params.id
    const sql ='SELECT  message, patient.id, patient.firstname, patient.lastname, mood_status, creation_date FROM message JOIN patient ON patient.id = message.patient_id JOIN doctor ON doctor.id = message.doc_id WHERE 1 = 1 AND doctor.id = ? AND message.mood_status = 3 AND message.read=false ORDER BY creation_date DESC, patient.id DESC'

	connection.query(sql, [idDoctor], (err, result) => {
		if (err) {
			return res.status(500).send(`An error occurred: ${err.message}`)
		} else {
			return res.status(200).json(result)
		}
	})
})

module.exports = Router