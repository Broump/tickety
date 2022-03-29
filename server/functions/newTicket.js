const User = require("../model/user");
const { encrypt } = require("../helper/crypto.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.connect(process.env.CONNECTION);

async function NewTicket(
	token,
	ticket_name,
	ticket_created_date,
	ticket_status,
	ticket_categorie,
	ticket_forWho
) {
	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const email = decoded.email;

		const addprocess = await User.findOneAndUpdate(
			{ email: email },
			{
				$push: {
					tickets: {
						ticket_name: ticket_name,
						ticket_created_date: ticket_created_date,
						ticket_status: ticket_status,
						ticket_categorie: ticket_categorie,
						ticket_forWho: ticket_forWho,
					},
				},
			}
		);
		return { status: "ok" };
	} catch (err) {
		return { status: "error" };
	}
}

module.exports = {
	NewTicket,
};
