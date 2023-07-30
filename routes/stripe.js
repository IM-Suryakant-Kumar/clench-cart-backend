const express = require("express");
const router = express.Router();
const stripeCheckout = require("../controllers/stripe");
const { authenticateUser } = require("../middleware/authentication");

router.route("/payment").post(authenticateUser, stripeCheckout);

module.exports = router;
