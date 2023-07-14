const router = require("express").Router();
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "inr",
					product_data: {
						name: "T-shirt"
					},
					unit_amount: 2000
				},
				quantity: 1
			}
		],
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/success`,
		cancel_url: `${process.env.CLIENT_URL}/cart`
	});

	res.send({ url: session.url });
});

module.exports = router;
