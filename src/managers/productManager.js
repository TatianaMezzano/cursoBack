import fs from "fs";

let products = [];
let pathFile = "/src/data/products.json";

 const addProduct = async (product) => {
    
    const {title, description, price, thumbnail, code, stock} = product;
    
    const newProduct = {
        id: products.length > 0  ? products[products.length-1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status : true
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

    await fs.promises.appendFile(pathFile, JSON.stringify(products));
    
 }

 const getProducts = async (limit) => {
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    products = JSON.parse(productsJson) || [];

    if (limit && limit > 0) {
        products = products.slice(0, limit);
    }

    console.log(products);
    return products;
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
    let products = await getProducts(); // Obtener la lista de productos
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        // Si el producto existe, actualizarlo
        products[index] = {
            ...products[index],
            ...dataProduct
        };
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
    } else {
        throw new Error("Product not found"); // Lanzar un error si el producto no se encuentra
    }
}


const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter(product => product.id === id );

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

export {addProduct, getProducts, getProductById, updateProduct, deleteProduct};