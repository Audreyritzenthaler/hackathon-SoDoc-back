const express = require('express')
const { connection } = require('../../config')
const Router = express.Router()

//POST authentification

Router.get('/', (req,res) => {
    res.send('salut')
})

Router.post('/', (req, res) => {console.log(req.body)
    // Lack of data validation HERE
    const { email, pwd } = req.body
    const sql = 'SELECT * FROM patient WHERE email = ?'
    const values = [
        email,pwd
    ]
    connection.query(sql, values, (err, result) => {
        console.log('result',result)
        if (err) {
            return res.status(500).send(`An error occurred: ${err.message}`)
        } else if (!result.email[0]) {
            return res.status(409).send('Utilisateur inconnu')
        } 
    }
  )
})

module.exports = Router