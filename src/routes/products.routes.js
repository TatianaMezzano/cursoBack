import { Router } from "express";
import {addProduct, getProducts, getProductById, updateProduct, deleteProduct} from "./src/managers/productManager.js";


const router = Router();


router.get('/', read);
router.post('/', create);
router.get('/:pid', readOne);
router.put('/:pid', update);
router.delete('/:pid', deleteProd);



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

async function create(req, res){
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const one = await addProduct(title, description, price, thumbnail, code, stock);
        return res.json({ status: 201, response: one });
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "ERROR" });
    }
}

async function update(req,res){
    try {
        const {pid} = req.params;
        const numPid = parseInt(pid);

        const data = req.body;

        const one = await updateProduct(numPid, data);

        if(one){
            return res.json({status: 200, response: one})
        }else{
            const error = new Error("Not Found");
            error.status = 404;

            throw error
        }       


        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "ERROR" });
    }
}

async function deleteProd(req,res){
    try {
        const {pid} = req.params;
        const numPid = parseInt(pid);

        const one = await getProductById(numPid);

        if(one){
            await deleteProduct(numPid);
            return res.json({status:200, response: one})
        }else{
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }

        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "ERROR" });
    
        
    }
}
export default router;
