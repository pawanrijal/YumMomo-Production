import { loadStripe } from "@stripe/stripe-js";

const getStripe = () => {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return stripe;
};

export default getStripe;
