const express = require("express")
const dotenv = require("dotenv").config()
const path = require('path')
const port = process.env.PORT || 5000
const {errorHandler} = require("./middlewares/errorsMiddleware")
const goalsRoutes = require("./routes/goalsRoutes")
const userRoutes = require('./routes/userRoutes')
const colors = require("colors");
const connectDB = require("./config/db")

const app = express()

connectDB()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use('/api/goals', goalsRoutes)
app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))