const express = require('express')
const { connection } = require('../../config')
const Router = express.Router()

//POST authentification
Router.post('/', (req, res) => {
    // Lack of data validation HERE
    const { mail, pwd } = req.body
    const sql = 'SELECT * FROM patient WHERE email = ?'
    const values = [
        mail,pwd
    ]
    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).send(`An error occurred: ${err.message}`)
        } else if (!result[0].email) {
            return res.status(409).send('Utilisateur inconnu')
        } else if (result[0].password !== pwd) {
            return res.status(401).send('Wrong password')
        } else {
            return res.status(200).json(result[0].id)
        }
    }
  )
})

module.exports = Router