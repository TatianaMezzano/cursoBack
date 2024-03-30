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
    
 }

 const getProducts = () => {
    console.log(products);
    return products;
 }

 const getProductById = (id) => {
    const product = products.find(product => product.id === id);
    if (!product){
        console.log(`No se encontro el producto con el id ${id}`);
        return;
    } 
    console.log(product);
    return product;
 }

