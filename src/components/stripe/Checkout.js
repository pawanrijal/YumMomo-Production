import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function Checkout({ cart }) {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const checkoutSession = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
        }),
      });

      if (checkoutSession.ok) {
        const data = await checkoutSession.json();
      } else {
        console.error(
          "Failed to fetch checkout session:",
          checkoutSession.statusText
        );
      }

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
