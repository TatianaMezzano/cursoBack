import express from "express";

const app = express();

const port = 8080;
const ready = console.log("server ready on port " + port);

app.listen(port, ready);


app.get('/products', read);

async function read(req, res) {
    try {
        const allProducts = await products.read();
        return res.json({status: 200, response: allProducts});
    } catch (error) {
        console.log(error);
        return res.json ({ status: 500, response: error.message });
    }
}

async function readOne(req, res){
    try {
        const {pid} = req.params;
        const one = await products.readOne(pid);
        return res.json({status: 200, response: one}); 
    } catch (error) {
        console.log(error);
        return res.json ({ status: 500, response: error.message });
    }
}