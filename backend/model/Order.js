const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    size: String,
    color: String,
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending"
  },
  
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default: "Processing",
  }
}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
