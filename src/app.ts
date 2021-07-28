import path from 'path'
import morgan from 'morgan'
import express from 'express'
import 'express-async-errors'
import apiRoutes from './routes'
import errorHandler from './errors'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// resources routes
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/api', apiRoutes)

// error handling
app.use(errorHandler)

export default app
