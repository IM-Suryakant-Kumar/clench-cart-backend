const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_KEY);

const stripeCheckout = async (req, res) => {
	const line_items = req.body.products.map(item => {
		return {
			price_data: {
				currency: "inr",
				product_data: {
					name: item.title,
					images: [item.img],
					description: item.desc,
					metadata: {
						id: item._id,
					},
				},
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		};
	});

	const session = await stripe.checkout.sessions.create({
		// shipping_address_collection: {
		// 	allowed_countries: ["US", "CA", "IN"]
		// },
		// shipping_options: [
		// 	{
		// 		shipping_rate_data: {
		// 			type: "fixed_amount",
		// 			fixed_amount: {
		// 				amount: 0,
		// 				currency: "inr"
		// 			},
		// 			display_name: "Free shipping",
		// 			delivery_estimate: {
		// 				minimum: {
		// 					unit: "business_day",
		// 					value: 5
		// 				},
		// 				maximum: {
		// 					unit: "business_day",
		// 					value: 7
		// 				}
		// 			}
		// 		}
		// 	},
		// 	{
		// 		shipping_rate_data: {
		// 			type: "fixed_amount",
		// 			fixed_amount: {
		// 				amount: 1500,
		// 				currency: "inr"
		// 			},
		// 			display_name: "Next day air",
		// 			delivery_estimate: {
		// 				minimum: {
		// 					unit: "business_day",
		// 					value: 1
		// 				},
		// 				maximum: {
		// 					unit: "business_day",
		// 					value: 1
		// 				}
		// 			}
		// 		}
		// 	}
		// ],
		// phone_number_collection: {
		// 	enabled: true
		// },
		line_items: line_items,
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/success?payment=true`,
		cancel_url: `${process.env.CLIENT_URL}/cart`,
	});

	res.status(200).send({ url: session.url });
};

module.exports = stripeCheckout;
