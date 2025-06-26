const Cart = require("../model/Cart");
const Checkout = require("../model/Checkout");
const Order = require("../model/Order");




exports.newCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod } = req.body;

  if (checkoutItems.length === 0 || !checkoutItems) {
    return res.status(400).json({ error: "Cart is Empty" });
  }

  const totalPrice = Math.round(
    checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });

    res.status(200).json(newCheckout);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ error: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.isPaid = true;
      checkout.paidAt = Date.now();
      await checkout.save();
      return res
        .status(200)
        .json({ message: "Checkout updated successfully", checkout });
    } else {
      return res.status(400).json({ error: "Payment not successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error in updateCheckout",
    });
  }
};

exports.finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ error: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        paymentStatus: checkout.paymentStatus,
        isPaid: checkout.isPaid,
        paymentStatus: "paid",
        paidAt: checkout.paidAt,
        isFinalized: true,
        isDelivered: false,
        finalizedAt: Date.now(),
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      await Cart.findOneAndDelete({ user: checkout.user });

      res.status(200).json({
        success: true,
        message: "Checkout finalized successfully",
        finalOrder,
      });
    } else if (checkout.isFinalized && checkout.isPaid) {
      res.status(200).json({
        success: true,
        message: "Checkout finalized successfully",
        finalOrder,
      });
    } else {
      return res.status(400).json({ error: "Checkout not finalized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error in finalze checkout",
    });
  }
};
