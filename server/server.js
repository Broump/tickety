const express = require("express");
const cors = require("cors");
require("dotenv").config();

//importing all functions
const register = require("./functions/register");
const login = require("./functions/login");
const newTicket = require("./functions/newTicket");
const getTickets = require("./functions/getTickets");
const getUserData = require("./functions/getUserData");
const updateUser = require("./functions/updateUser");
const deleteTicket = require("./functions/deleteTicket");
const deleteUser = require("./functions/deleteUser");

const app = express();
app.use(cors());
app.use(express.json());

//endpoint to register a new user -> status "ok" or "error"
app.post("/api/register", async (req, res) => {
	username = req.body.username;
	email = req.body.email;
	password = req.body.password;

	const resRegister = register.RegisterUser(username, email, password);

	res.json(await resRegister);
});

//endpoint to login a user -> status "ok" or "error"
app.post("/api/login", async (req, res) => {
	email = req.body.email;
	password = req.body.password;

	const resLogin = login.LoginUser(email, password);

	res.json(await resLogin);
});

//endpoint to get user data from a given user -> user data
app.get("/api/get-user-data", async (req, res) => {
	token = req.headers["accesstoken"];

	const resGetUserData = getUserData.GetUserData(token);

	res.json((await resGetUserData).data);
});

//endpoint to update a given user -> status "ok" or "error"
app.post("/api/update-user", async (req, res) => {
	token = req.body.accestoken;
	username = req.body.username;
	email = req.body.email;
	password = req.body.password;

	const resUpdateUser = updateUser.UpdateUser(token, username, email, password);

	res.json(await resUpdateUser);
});

//endpoint to delete a given user -> status "ok" or "error"
app.post("/api/delete-user", async (req, res) => {
	token = req.body.accestoken;

	const resDeleteUser = deleteUser.DeleteUser(token);

	res.json(await resDeleteUser);
});

//endpoint to create a new ticket -> status "ok" or "error"
app.post("/api/new-ticket", async (req, res) => {
	token = req.body.accestoken;
	ticket_name = req.body.ticket_name;
	ticket_categorie = req.body.ticket_categorie;
	ticket_description = req.body.ticket_description;
	ticket_due_date = req.body.ticket_due_date;
	ticket_status = req.body.ticket_status;
	ticket_forWho = req.body.ticket_forWho;

	const resNewTicket = newTicket.NewTicket(
		token,
		ticket_name,
		ticket_categorie,
		ticket_description,
		ticket_due_date,
		ticket_status,
		ticket_forWho
	);

	res.json(await resNewTicket);
});

//endpoint to get all tickets of a given user -> process data
app.get("/api/get-tickets", async (req, res) => {
	token = req.headers["accesstoken"];

	const resGetTicket = getTickets.GetTickets(token);

	res.json((await resGetTicket).data);
});

//endpoint to delete a given ticket -> status "ok" or "error"
app.post("/api/delete-ticket", async (req, res) => {
	token = req.body.accestoken;
	ticket_id = req.body.ticket_id;

	const resDeleteTicket = deleteTicket.DeleteTicket(token, ticket_id);

	res.json(await resDeleteTicket);
});

//starting the server, process.env.PORT == Heroku Port
app.listen(3001, () => {
	console.log("Server is running on PORT 3001");
});
