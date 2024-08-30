const { UserProfile } = require('../models');
const { UserOTP } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// console.log("frontend Url::::", process.env.FRONTEND_URL);
// console.log("STRIPE_SECRET_KEY ::::", process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
  const { title, price } = req.body;
  const UID = req.userPayload.uid; // Extract UID from JWT payload
  console.log('Product received::::::::::', { title, price ,UID});
  try {

    
       // Find the user profile based on the UID
    const lineItems  = [
        {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: `Plan for checkout: ${title}`,
                },
                unit_amount: Math.round(parseFloat(price) * 100),
            },
            quantity: 1,
        },
    ];
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/showallcourse`,
        cancel_url: `${process.env.FRONTEND_URL}/paymentfailed`,
    });

      // Retrieve the user profile using UID and update subscription_type
      const user = await UserProfile.findOne({ where: { UID } });
      if (user) {
        user.subscription_type = title.toUpperCase(); // Convert to uppercase to match ENUM values
        await user.save();
        console.log(`User with UID ${UID} updated with subscription type: ${title}`);
      } else {
        console.error(`User with UID ${UID} not found`);
        return res.status(404).json({ error: "User not found" });
      }
      
    res.json({ id: session.id });
} catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
}
};

module.exports = { payment };
