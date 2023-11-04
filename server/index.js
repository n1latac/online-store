require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const models = require('./models/model')
const sequelize = require('./db')
const {errorHandlerMiddleware} = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(errorHandlerMiddleware)

app.get('/', async(req, res)=>{
    res.status(200).send({message: 'Working!'})
})


const start = async()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>{
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()