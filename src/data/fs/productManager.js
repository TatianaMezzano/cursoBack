const { path } = require("express/lib/application");
const fs = require("fs");

let products = [];
let pathFile = "./products.json";

 const addProduct = async (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
        id: products.length > 0  ? products[products.length-1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock 
    }
    

    if(Object.values(newProduct).includes(undefined)){
        console.log("Todos los campos son obligatorios");
        return;
    }

    const productExists = products.find(product => product.code === code);

    if (productExists) {
        console.log(`el producto ${title} con el codigo ${code} ya existe`);
        return;
    }  

    products.push(newProduct);

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    
 }

 const getProducts = async () => {
    const productsJson = await fs.promise.readFile(path, "utf8");
    products = JSON.parse(productsJson) || [];
    console.log(products);
 }

 const getProductById = async (id) => {
    await getProducts();
    const product = products.find(product => product.id === id);
    if (!product){
        console.log(`No se encontro el producto con el id ${id}`);
        return;
    } 
    console.log(product);
    return product;
 }

const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex(product => product.id === id );
    products[index] = {
        ...products[index],
        ...dataProduct
     }

     await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter(product => product.id === id );

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}