

 class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo=nombreArchivo
    }

    save=async(objeto)=>{ ///Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

        const fs=require('fs')
        let contenido
        let datosParseados
        let ultimoID=1

        try{
            contenido = await fs.promises.readFile(this.nombreArchivo,'utf8')
            datosParseados=JSON.parse(contenido)
        }
        catch(error){
            console.log('No se pudo abrir el archivo. Código de error:' + error)
        }
        
        if(datosParseados.length>0){
            datosParseados.map(elemento=>{
                if(JSON.parse(elemento.id)>JSON.parse(ultimoID)){
                    ultimoID=elemento.id
                }
            })
            ultimoID++;
        }

        datosParseados.push({id:`${ultimoID}`,
                            ...objeto})

        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(datosParseados),"utf8")
                console.log('El dato fue agregado al archivo')
                console.log('ultimoID: '+ultimoID)
            }
            
            catch(err){
                console.log('No se pudo agregar el dato al archivo')
            }
            return ultimoID
    }

    getById=async(Numero)=>{ //Recibe un id y devuelve el objeto con ese id, o null si no está.

        const fs=require('fs')
        let contenido
        let datosParseados
        let datoBuscado

        
        try{
            contenido = await fs.promises.readFile(this.nombreArchivo,'utf8')
            datosParseados=JSON.parse(contenido)
        }
        catch(error){
            console.log('No se pudo abrir el archivo. Código de error:' + error)
        }
        
        datosParseados.map(elemento=>{
            if(JSON.parse(elemento.id)===JSON.parse(Numero)){
                datoBuscado = elemento
            }
        })
        if(datoBuscado){
            return datoBuscado
        }
        else{
            return null
        }   
    }

    getAll = async()=>{ //Devuelve un array con los objetos presentes en el archivo.

        const fs=require('fs').promises
        let contenido
        try{
            contenido = await fs.readFile(this.nombreArchivo,'utf8')
            return (contenido)
        }
        catch(error){
            console.log('No se pudo abrir el archivo. Código de error:' + error)
        }
        
    }

    deleteById = async(Numero)=>{ //Elimina del archivo el objeto con el id buscado.

            const fs=require('fs')
            let datosParseados
            let datosFiltrados
            let resultado=false

            try{
                const contenido = await fs.promises.readFile(this.nombreArchivo,'utf8')
                datosParseados=JSON.parse(contenido)
                datosFiltrados=datosParseados.filter(elemento=>{
                    if(JSON.parse(elemento.id)!==JSON.parse(Numero)){
                        return elemento
                    }
                    if(datosFiltrados===datosParseados){
                        resultado=false
                    }
                    else{
                        resultado = true
                    }
                })
            }
            catch(error){
                console.log('No se pudo abrir el archivo. Código de error:' + error)
            }
            
            try{
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(datosFiltrados),"utf8")
            }
    
            catch(err){
                console.log('No se pudo borrar dicho dato')
            }
            return resultado
    }

    async deleteAll(){  // Elimina todos los objetos presentes en el archivo.

        const fs=require('fs')
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([]),"utf8")
                console.log('Archivo borrado con éxito')
        }

        catch(err){
            console.log('No se pudo realizar la operación')
        }
    }
    
}

module.exports = Contenedor