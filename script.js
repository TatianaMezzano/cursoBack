let products = [];

 const addProduct = (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
        id: products.length > 0  ? products[products.length-1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock 
    }

    if 

    const productExists = products.find(product => product.code === code);

    if (productExists) {
        console.log(`el producto ${title} con el codigo ${code} ya existe`);
        return;
    }  

    products.push(newProduct);
    
 }

 const getProducts = () => {
    console.log(products);
    return products;
 }

 const getProductById = (id) => {

 }

//test



addProduct("computer", "black computer", 500, "computerPicture", 123, 4);
addProduct("mouse", "black mouse", 500, "mousePicture", 234, 4);
getProducts();

