const mongoose = require("mongoose");
const Product = require("../model/Product");
const productData = require("../data/ProductData");
const dotenv = require("dotenv");
const User = require("../model/User");
const UserData = require("../data/UserData");

dotenv.config(
    {
        path: "../.env"
    }
);

mongoose.connect(process.env.MONGODB_URI).then(async() => {
    try {
        // await Product.deleteMany();
        // const inserted = await Product.insertMany(productData);
        // console.log(inserted);

        const user = await User.insertMany(UserData);
        console.log(user);
       
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})