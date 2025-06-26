const jwt = require("jsonwebtoken");
const Cart = require("../model/Cart");
const Product = require("../model/Product");

const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    return null;
  }
};

exports.addToCart = async (req, res) => {

  try {
    const { productId, size, gender, quantity, guestId } = req.body;
    const userId = req.user?._id; // From your verifyToken middleware

   

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Check size availability
    if (size && !product.sizes.includes(size)) {
      return res.status(400).json({
        success: false,
        message: `Size "${size}" not available.`,
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available.",
      });
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      size,
      gender,
      quantity,
      price: product.discountPrice || product.price,
      images: product.images[0]?.url || "",
    };

    let cart;

    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      cart = new Cart({
        user: userId || undefined,
        guestId: guestId || undefined,
        products: [cartItem],
        totalPrice: cartItem.price * quantity,
      });
    } else {
      const existingItem = cart.products.find(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.gender === gender
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push(cartItem);
      }

      cart.totalPrice = Math.round(
        cart.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      );
    }

    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { guestId } = req.query;

    let cart;

    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    } else {
      return res.status(200).json({
        success: true,
        cart: { products: [], totalPrice: 0 },
      });
    }

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { products: [], totalPrice: 0 },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, size, gender, quantity, guestId } = req.body;
    const userId = req.user?._id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available.",
      });
    }

    const itemIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.gender === gender
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.products[itemIndex].quantity = quantity;
    cart.totalPrice = Math.round(
      cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );

    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Update cart item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId, size, gender, guestId } = req.body;
    const userId = req.user?._id;

    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const initialLength = cart.products.length;

    cart.products = cart.products.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size &&
          item.gender === gender
        )
    );

    if (cart.products.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.totalPrice = Math.round(
      cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );

    await cart.save();
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.mergeCarts = async (req, res) => {
  try {
    console.log("Request received - mergeCarts", req.user);
    const userId = req.user._id; // From verifyToken middleware
    const { guestId } = req.body;

    if (!guestId) {
      return res.status(400).json({
        success: false,
        message: "Guest ID is required",
      });
    }

    const [userCart, guestCart] = await Promise.all([
      Cart.findOne({ user: userId }),
      Cart.findOne({ guestId }),
    ]);

    if (!guestCart) {
      return res.status(200).json({
        success: true,
        cart: userCart || { products: [], totalPrice: 0 },
      });
    }

    if (!userCart) {
      guestCart.user = userId;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.status(200).json({
        success: true,
        cart: guestCart,
      });
    }

    guestCart.products.forEach((guestItem) => {
      const existingItem = userCart.products.find(
        (userItem) =>
          userItem.productId.toString() === guestItem.productId.toString() &&
          userItem.size === guestItem.size &&
          userItem.gender === guestItem.gender
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        userCart.products.push(guestItem);
      }
    });

    userCart.totalPrice = Math.round(
      userCart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    );

    await Promise.all([
      userCart.save(),
      Cart.deleteOne({ _id: guestCart._id }),
    ]);

    res.status(200).json({
      success: true,
      cart: userCart,
    });
  } catch (error) {
    console.error("Merge carts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
