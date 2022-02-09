
const fs = require ('fs')
const express = require ('express')
const multer = require ('multer')
const app = express()
const PORT = process.env.PORT || 8080

const route = require('./routes/routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos', route)

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto ${PORT}`)
})
