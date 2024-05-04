import fs from "fs";

const carts = [];

const pathFile = "/src/data/carts.json";

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile, "utf8");
    carts = JSON.parse(cartsJson) || [];

    return carts;
}

const createCarts = async () => {
    await getCarts();
    
    const newCart = {
        id: products.length > 0  ? products[products.length-1].id + 1 : 1,
        products: []
    }

    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return newCart;
}


export default {getCarts, createCarts}