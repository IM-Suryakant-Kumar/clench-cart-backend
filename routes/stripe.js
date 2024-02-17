const express = require("express");
const router = express.Router();
const stripeCheckout = require("../controllers/stripe");
const { authenticateUser } = require("../middlewares");

router.route("/payment").post(authenticateUser, stripeCheckout);

module.exports = router;
