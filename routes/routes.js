express = require('express')
const path = require('path')

const contenedor = require('../contenedor.js')
let instanciaArchivo = new contenedor('./Productos/Productos.json')

const {Router} = express

const route = new Router()

route.get('/', (req, res)=>{
     instanciaArchivo.getAll().then((info)=>{
        res.json(info)
     })
})

route.get('/:id', (req, res)=>{
    instanciaArchivo.getById(req.params.id).then((info)=>{
        if (info){
            res.json(info) 
        }
        else{
            res.send({error: 'producto no encontrado'})
        }
    })
})

route.post('/', (req,res)=>{
    console.log ('%o', req.body)
    instanciaArchivo.save(req.body).then((id)=>{
        res.send({id,...req.body})
    })
})

route.delete('/:id', (req, res)=>{
    instanciaArchivo.deleteById(req.params.id).then((info)=>{
        if (info===true){
            res.send({success:'producto eliminado'}) 
        }
        else{
            res.send({error: 'producto no encontrado'})
        }
    })
})

route.put('/:id', (req,res)=>{
    instanciaArchivo.getAll().then((info)=>{
        let datosParseados = JSON.parse(info)
        datosParseados.map((item)=>{
            if(JSON.parse(item.id)===JSON.parse(req.params.id)){
                item.title = req.body.title
                item.price = req.body.price
                item.thumbnail = req.body.thumbnail
                instanciaArchivo.deleteById(JSON.parse(item.id)).then(()=>{
                    instanciaArchivo.save(item)
                })
                console.log('item: %o' , item)
            }
        })
    })
    res.send({success: 'Información actualizada'})
})

module.exports = route
