const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/user");
mongoose.connect(process.env.CONNECTION);

async function DeleteTicket(token, ticket_id) {
	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const email = decoded.email;

		const result = await User.findOneAndUpdate(
			{
				email: email,
			},
			{ $pull: { tickets: { _id: ticket_id } } }
		);

		return { status: "ok" };
	} catch (err) {
		return { status: "error" };
	}
}

module.exports = {
	DeleteTicket,
};
