const data = require('./greendeck');
const mongoose = require("mongoose");
const productSchema = require("./index");

mongoose.connect('mongodb://localhost/greendeck')
    .then(() => console.log('Connected To mongodb'))
    .catch((err) => console.log('Exception Occured ', err));

const formattedData = data.map(el => {
    const formattedEl = {...el, 
        discount: (el.price.regular_price.value - el.price.offer_price.value)/el.price.regular_price.value * 100,
        created_at: new Date(el.created_at.$date)
    }

    delete formattedEl._id;
    return formattedEl
});

const productSchema = new mongoose.Schema({
    name: String,
    brand: {},
    price: {},
    discount: Number,
    stock: {},
    created_at: Date
});

formattedData.forEach(data => {
    let product = new Product(data);
    product.save().then(_ => console.log('Uploaded'));
});
