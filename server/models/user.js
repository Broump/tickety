const mongoose = require("mongoose");

const Ticket = new mongoose.Schema({
	ticket_name: {
		type: String,
	},
	ticket_created_date: {
		type: Date,
	},
	ticket_status: {
		type: String,
	},
	ticket_categorie: {
		type: String,
	},
	ticket_forWho: {
		type: String,
	},
});

const User = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		tickets: [Ticket],
	},
	{ collection: "user-data" }
);

const Usermodel = mongoose.model("UserData", User);

module.exports = Usermodel;
