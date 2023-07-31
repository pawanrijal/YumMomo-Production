const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cart = JSON.parse(req.body.cart);
    try {
      const keys = Object.keys(cart);
      // const line_items2 = keys.map(async (element) => {
      //   const product = await fetchProductBySlug(element);
      //   return {
      //     price: product.stripeId,
      //     quantity: cart[element]["qty"],
      //     // currency: "CAD",
      //   };
      // });

      const line_items2 = [];
      for (const element of keys) {
        try {
          const product = await fetchProductBySlug(element);
          console.log(product);
          line_items2.push({
            price: product.stripeId,
            quantity: cart[element]["qty"],
          });
        } catch (err) {
          console.log(err);
        }
      }
      console.log(line_items2);
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     price: cart.stripeId,
        //     // quantity: 1,
        //     // currency: "CAD",
        //   },
        // ],
        line_items: line_items2,
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function fetchProductBySlug(slug) {
  const response = await fetch(`http://localhost:3000/api/product/${slug}`);
  const productData = await response.json();
  return productData;
}
