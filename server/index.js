const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api", require("./Routes/food"));
app.use("/api", require("./Routes/review"));

const stripe = require("stripe")(
  "sk_test_51K0KFMGIOFJuO9tJkCjFVFU2BhHcjdRDCbgOuA950MjZKezpG4G1BX9NCyzP3Qku05KYJZUWP1oa4crgfEJYTHq000oRGAzM45"
);

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cart.map((item) => ({
    price_data: {
      currency: "bdt",
      product_data: {
        name: item.name,
        images: [item.image],
        metadata: {
          id: item.id,
        },
      },
      unit_amount: item.price * 100,
    },
    quantity: item.amount,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  console.log(session);
  res.status(200).send({ url: session.url });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
