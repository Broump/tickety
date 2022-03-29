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
	processname = req.body.processname;
	komootemail = req.body.komootemail;
	komootid = req.body.komootid;
	komootpassword = req.body.komootpassword;
	notion_database_id = req.body.notion_database_id;
	notion_api_token = req.body.notion_api_token;
	process_status = "stopped";

	const resNewTicket = newTicket.NewTicket(
		token,
		processname,
		komootemail,
		komootid,
		komootpassword,
		notion_database_id,
		notion_api_token,
		process_status
	);

	res.json(await resNewTicket);
});

//endpoint to get all tickets of a given user -> process data
app.get("/api/get-tickets", async (req, res) => {
	token = req.headers["accesstoken"];

	const resGetTicket = getTickets.GetProcess(token);

	res.json((await resGetTicket).data);
});

//endpoint to delete a given ticket -> status "ok" or "error"
app.post("/api/delete-ticket", async (req, res) => {
	token = req.body.accestoken;
	processid = req.body.processid;

	const resDeleteTicket = deleteTicket.DeleteTicket(token, processid);

	res.json(await resDeleteTicket);
});

//starting the server, process.env.PORT == Heroku Port
app.listen(process.env.PORT || 3001, () => {
	console.log("Server is running on PORT 3001 or Heroku");
});
