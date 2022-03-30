import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { TextInput, PasswordInput, Button, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";

import { EyeCheck, EyeOff, Check, X, Lock } from "tabler-icons-react";

import axios from "axios";

function Login() {
	const [submit, setSubmit] = useState(false);
	const notifications = useNotifications();

	async function LoginUser() {
		try {
			const user = await axios.post(
				"https://tickety-tickets.herokuapp.com/api/login",
				{
					email: form.values.email,
					password: form.values.password,
				}
			);
			if (user) {
				if (user.data.status === "ok") {
					notifications.showNotification({
						title: "Successfully logged in",
						message: "Your are now logged in",
						color: "green",
						loading: false,
						icon: <Check />,
						disallowClose: true,
					});
					localStorage.setItem("token", user.data.data);
					form.reset();
					setSubmit(true);
				} else {
					notifications.showNotification({
						title: "There was an error",
						message: "Wrong email or password",
						color: "red",
						loading: false,
						icon: <X />,
						disallowClose: true,
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	const form = useForm({
		initialValues: {
			password: "",
			email: "",
		},
	});

	return (
		<Box sx={{ maxWidth: 400 }} mx="auto">
			{submit ? (
				<Navigate to="/tickets" replace={true} />
			) : (
				<div>
					<form onSubmit={form.onSubmit(LoginUser)}>
						<TextInput
							placeholder="example@mail.com"
							label="Email"
							size="md"
							required
							mt="sm"
							{...form.getInputProps("email")}
						/>
						<PasswordInput
							placeholder="password"
							icon={<Lock />}
							label="Password"
							size="md"
							required
							visibilityToggleIcon={({ reveal, size }) =>
								reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
							}
							{...form.getInputProps("password")}
							mt="sm"
						/>
						<Button
							variant="outline"
							color="blue"
							type="submit"
							mx="20"
							mt="sm"
							mb="sm"
						>
							Login
						</Button>
					</form>
					<Link
						to="/register"
						style={{
							textDecoration: "none",
							color: "white",
						}}
					>
						No Account yet?
					</Link>
				</div>
			)}
		</Box>
	);
}

export default Login;
