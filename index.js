const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();


const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

app.use(express.json()) //to read the request body


 app.get('/', (req, res) => {
     res.setHeader("Access-Control-Allow-Credentials","true");
   res.send('API is running')
 })

//Available Routes
app.use('/api/auth', require('./routes/auth'))
 app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
 
})
