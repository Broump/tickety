const User = require("../model/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.connect(process.env.CONNECTION);

async function GetTickets(token) {
	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const email = decoded.email;

		const result = await User.find({ email: email }, function (err, user) {
			if (!err) {
				user.map((user) => {
					list_of_tickets = [];
					for (let index = 0; index < user.tickets.length; index++) {
						if (user.tickets.length > 0) {
							list_of_tickets.push({
								ticket_name: user.tickets[index].ticket_name,
								ticket_created_date: user.tickets[index].ticket_created_date,
								ticket_status: user.tickets[index].ticket_status,
								ticket_categorie: user.tickets[index].ticket_categorie,
								ticket_forWho: user.tickets[index].ticket_forWho,
								ticket_description: user.tickets[index].ticket_description,
								ticket_id: user.tickets[index]._id,
							});
						}
					}
				});
			} else {
			}
		}).clone();

		return { status: "ok", data: list_of_tickets };
	} catch (err) {
		return { status: "error" };
	}
}

module.exports = {
	GetTickets,
};
