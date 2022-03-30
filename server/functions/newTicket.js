const User = require("../model/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.connect(process.env.CONNECTION);

async function NewTicket(
	token,
	ticket_name,
	ticket_categorie,
	ticket_description,
	ticket_due_date,
	ticket_status,
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
						ticket_created_date: ticket_due_date,
						ticket_status: ticket_status,
						ticket_categorie: ticket_categorie,
						ticket_forWho: ticket_forWho,
						ticket_description: ticket_description,
					},
				},
			}
		);
		return { status: "ok" };
	} catch (err) {
		console.log(err);
		return { status: "error" };
	}
}

module.exports = {
	NewTicket,
};
