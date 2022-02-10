import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import multer from 'multer'
dotenv.config()

const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const PORT = process.env.PORT | 5000

const connectionUri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// config limit upload size
app.use(
  bodyParser.json({
    limit: '50mb'
  })
)

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
)

mongoose
  .connect(connectionUri, { useUnifiedTopology: true })
  .then(() => {
    console.log('connect to DB')

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('error', err)
  })
