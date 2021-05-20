const express = require('express');
const routes = express.Router();


routes.get('/',(req,resp)=>{
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        conn.query('SELECT * FROM allprospects', (err,data)=>{
            if(err) return console.log(err)

            resp.json(data)
        })
    })
})

routes.get('/evaluar',(req,resp)=>{
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        conn.query('SELECT * FROM allprospects WHERE prospecto_status = ?','Enviado', (err,data)=>{
            if(err) return console.log(err)

            resp.json(data)
        })
    })
})

routes.get('/especifico/:id',(req,resp)=>{
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        conn.query('SELECT * FROM allprospects WHERE prospecto_id = ?',[req.params.id] , (err,data)=>{
            if(err) return console.log(err)

            resp.json(data)
        })
    })
})


routes.post('/',(req,resp)=>{
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        conn.query('INSERT INTO allprospects set ?',[req.body], (err,data)=>{
            if(err) return console.log(err)

            resp.send('El prospecto ha sido añadido')
        })
    })
})

routes.delete('/:id',(req,resp)=>{
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        conn.query('DELETE FROM allprospects WHERE prospecto_id = ?',[req.params.id], (err,data)=>{
            if(err) return console.log(err)

            resp.send('El prospecto ha sido eliminado')
        })
    })
})

routes.put('/:id',(req,resp)=>{
    req.getConnection((err,conn)=>{
        if(err) return console.log(err)

        conn.query('UPDATE allprospects SET ? WHERE prospecto_id = ?',[req.body, req.params.id], (err,data)=>{
            if(err) return console.log(err)

            resp.send('El prospecto ha sido actualizado')
        })
    })
})
module.exports=routes;