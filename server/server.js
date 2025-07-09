import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


// Cors configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Dotenv configation
dotenv.config()


const app = express()
const PORT = 3000


// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Database connection
import connectToDatabase from './utils/database_connection.js'
await connectToDatabase().then(() => {

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}) 

app.get('/', (req, res) => {
  res.send('Server is running!')
})


// Routes
import UserRouter from './routes/User.js'
import emailRouter from './routes/Email.js'

app.use('/api/user', UserRouter)
app.use('/api/email', emailRouter)

