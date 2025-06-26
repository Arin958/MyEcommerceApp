const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  size: String,
  gender: String,
  quantity: {
    type: Number,
    default: 1,
  },
  price: Number,
  images: String,
}, {
    _id: false
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId: {
        type:String,
    },
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0,
    },
} ,{
    timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
