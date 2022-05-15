const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const {errorHandler} = require("./middlewares/errorsMiddleware")
const goalsRoutes = require("./routes/goalsRoutes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(errorHandler)

app.use('/api/goals', goalsRoutes)

app.listen(port, () => console.log(`server started on port ${port}`))