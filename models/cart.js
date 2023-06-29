const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const { json } = require("body-parser");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Забрати попередній кошик
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                cart = JSON.parse(fileContent);
                console.log(cart);
            }
            // Analyze the cart => Find existing product 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            console.log(existingProductIndex);
            const existingProduct = cart.products[existingProductIndex];
            console.log(existingProduct);
            let updatedProduct;
            // Add new product/ increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                console.log(updatedProduct);
                cart.products = [...cart.products, updatedProduct];
                console.log(cart.products);
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err);
            })
        })
        


        
    }


}