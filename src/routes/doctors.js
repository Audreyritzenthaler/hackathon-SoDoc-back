const express = require('express')
const { connection } = require('../../config')
const Router = express.Router()

//GET messages by doctor by mood_status 0 by unread 
Router.get('/:id/messages', (req, res) => {
	const idDoctor = req.params.id
    const sql ='SELECT  message, patient.id, patient.firstname, patient.lastname, mood_status, creation_date FROM message JOIN patient ON patient.id = message.patient_id JOIN doctor ON doctor.id = message.doc_id WHERE 1 = 1 AND doctor.id = ? AND message.mood_status = 0 AND message.read=false ORDER BY creation_date DESC, patient.id DESC'

	connection.query(sql, [idDoctor], (err, result) => {
		if (err) {
			return res.status(500).send(`An error occurred: ${err.message}`)
		} else {
			return res.status(200).json(result)
		}
	})
})

//GET all messages of a patient for a doctor
Router.get('/:doctorId/patients/:patientId/messages', (req, res) => {
    const { doctorId, patientId } = req.params
    const sql ='SELECT message, mood_status, creation_date, message.read FROM message JOIN patient ON patient.id = message.patient_id JOIN doctor ON doctor.id = message.doc_id WHERE 1=1 AND doctor.id = ? AND patient.id = ? ORDER BY creation_date DESC'

	connection.query(sql, [doctorId, patientId], (err, result) => {
		if (err) {
			return res.status(500).send(`An error occurred: ${err.message}`)
		} else {
			return res.status(200).json(result)
		}
	})
})


//GET doctor's patients 
Router.get('/:id/patients', (req,res) => {
    const idDoctor = req.params.id
		const sql = 'SELECT DISTINCT p.firstname, p.lastname, p.email, p.phoneNumber, p.id FROM message JOIN patient p ON p.id = message.patient_id JOIN doctor d ON message.doc_id = d.id WHERE message.doc_id = ?'
		
    connection.query(sql, [idDoctor], (err,result) => {
        if (err) {
			return res.status(500).send(`An error occurred: ${err.message}`)
		} else {
			return res.status(200).json(result)
		}
    })
})


//GET doctor's profile
Router.get('/:id', (req, res) => {
	const sql = 'SELECT firstname, lastname, email, phoneNumber FROM doctor'

		connection.query(sql, (err,result) => {
			if (err) {
		return res.status(500).send(`An error occurred: ${err.message}`)
	} else {
		return res.status(200).json(result)
	}
	})
})


module.exports = Router