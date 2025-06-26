const cron = require("node-cron");
const Checkout = require("../model/Checkout");

cron.schedule("*/10 * * * *", async () => {
  const THIRTY_MINUTES = new Date(Date.now() - 30 * 60 * 1000);
  const TEN_MINUTES = new Date(Date.now() - 10 * 60 * 1000);

  try {
    const deleted = await Checkout.deleteMany({
      isPaid: false,
      isFinalized: false,
      createdAt: { $lt: TEN_MINUTES },
    });

    console.log(`Deleted ${deleted.deletedCount} checkouts`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = cron;


