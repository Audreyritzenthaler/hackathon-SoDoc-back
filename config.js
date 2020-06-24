// config.js
const dotenv = require('dotenv')
dotenv.config()

// Server Back info
const port = process.env.PORT

// MySQL data
const mysql = require('mysql2')
const databaseCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}
const connection = mysql.createConnection(databaseCredentials)

// Test connection to the Database
connection.connect(err => {
  if (!err) {
    console.log('Database is connected')
  } else {
    console.log('Error connecting database', err)
  }
})

// Export
module.exports = {
  port,
  connection,
}