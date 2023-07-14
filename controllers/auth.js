const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createTokenUser } = require("../utils")

// REGISTER
const register = async (req, res) => {
    const { name, email, password } = req.body

    if(!(name && email && password)) { 
        throw new 
    }

    const emailAlreadyExists = await User.findOne({ email })
    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError("Email is already exists")
    }

    // first register user is admin
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? "admin" : "user"

	const user = await User.create({ name, email, password, role })
    const tokenUser = createTokenUser(user)
    
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

// LOGIN
const login = async (req, res) => {
	const { email, password } = req.body

	if (!(email && password)) {
		throw new BadRequestError("Please provide email and password")
	}

	const user = await User.findOne({ email })
	if (!user) {
		throw new UnauthenticatedError("Invalid credential")
	}
	const isPasswordCorrect = await user.comparePassword(
		password,
		user.password
	)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credential")
	}
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

// LOGOUT

module.exports = {
	register,
	login
}
