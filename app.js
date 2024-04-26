import express from "express";
import {addProduct, getProducts, getProductById, updateProduct, deleteProduct} from "./src/data/fs/productManager.js";

const app = express();

const port = 8080;
const ready = console.log("server ready on port " + port);

app.listen(port, ready);

app.use(express.urlencoded({extended:true}));


app.get('/products', read);
app.get('/products/:pid', readOne);



async function read(req, res) {
    try {
        const {limit} = req.query;
        const numLimit = parseInt(limit);

        const allProducts = await getProducts(numLimit);
        if(allProducts.length > 0){
            return res.json({status: 200, response: allProducts});
        }else{
            const error = new Error("Not Found");
            error.status = 404; 
            throw error;
        }
    } catch (error) {
        console.log(error);
        return res.json ({ status: error.status || 500, response: error.message || "ERROR"});
    }
}


async function readOne(req, res){
    try {
        const {pid} = req.params;
        const numPid = parseInt(pid);
    
        const one = await getProductById(numPid);
        if(one){
            return res.json({status: 200, response: one}); 
        }else{
            const error = new Error("Not Found");
            error.status = 404; 
            throw error;
        }
    } catch (error) {
        console.log(error);
        return res.json ({ status: error.status || 500, response: error.message || "ERROR" });
    }
}

