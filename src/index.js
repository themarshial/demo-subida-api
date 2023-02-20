const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config()

let db = [
    { id:1, title: 'Hombre Araña 1', year: "2007", price: 45},
    { id:2, title: 'Hombre Araña 2', year: "2008", price: 46},
    { id:3, title: 'Hombre Araña 3', year: "2009", price: 47}
]
//middle
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log('servidor activo en el puerto ' + process.env.PORT);
});


//http://localhost:3000/direcciones
app.get("/peliculas",(req, res) => {
    console.log('consumo mi endpoint DIRECCIONES');
    responsePer(res);
});

app.post("/peliculas",(req, res) => {
    console.log(`POST: REQ.BODY -> ${JSON.stringify(req.body)}`);
    db.push(req.body);
    responsePer(res);
});

app.put("/peliculas/:id",(req, res) => {
    console.log('******* UPDATE*******');
    db = db.map((element) => {
        if(parseInt(element.id) === parseInt(req.params.id)){
            element.year = req.body.year ? req.body.year : element.year
            element.title = req.body.title
            element.price = req.body.price
        }
        return element
    })
    const response = {
        msg: 'Peliculas actualizada',
        data: db,
        status: 'ok',
        total: db.length,
    }
    res.json(response);
});

app.delete("/peliculas/:id",(req, res) => {
    db = db.filter((e) => {
        console.log(`e ${e.id} ${JSON.stringify(e)}`);
        return e.id !== parseInt(req.params.id)
    })

    const response = {
        msg: 'peliculas eliminada',
        data: db,
        status: 'ok',
        total: db.length,
    }
    res.json(response);
});

const responsePer = (res) => {
    const response = {
        msg: 'Peliculas obtenidas',
        data: db,
        total: db.length,
        status: 'ok'
    }
    res.json(response);
}
