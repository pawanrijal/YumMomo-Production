import { loadStripe } from "@stripe/stripe-js";
const stripe = require("stripe")(
  "sk_test_51NWiOPA3kdhK68pA6Hu10263ibkdHUIK2LFpgfLjPpamdNGPabOXRjgyQub6nEJN7h41GQ4f3vVjgqUW1yJRdJNH00zlAZ3rMO"
);

export const getStripe = () => {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return stripe;
};

export const addStripePrice = async (productName, amount) => {
  const product = await stripe.products.create({ name: productName });
  const price = await stripe.prices.create({
    product: product.id,
    currency: "CAD",
    unit_amount: amount,
  });
  return price;
};
