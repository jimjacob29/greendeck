const express = require('express');
const mongoose = require("mongoose");
const requestUtils = require("./utils/requestUtils");

const app = express();

mongoose.connect('mongodb://localhost/greendeck')
    .then(() => console.log('Connected To mongodb'))
    .catch((err) => console.log('Exception Occured ', err));

app.use(express.json());

const productSchema = new mongoose.Schema({
    name: String,
    brand: {},
    price: {},
    discount: Number,
    stock: {},
    created_at: Date
});

const Product = mongoose.model('product', productSchema);


app.post('/api/v1/filter', async (req, res) => {
    const data = await Product.find(requestUtils.createFilter(req.body));
    res.send(data);
});

app.listen(3000, () => console.log("Server started"));

module.exports = productSchema;