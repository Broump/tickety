import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useQuery } from "react-query";

import {
	Header,
	Box,
	Text,
	Menu,
	Divider,
	Modal,
	TextInput,
	PasswordInput,
	Button,
	Group,
	Skeleton,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import axios from "axios";

import {
	EyeCheck,
	EyeOff,
	Check,
	X,
	Lock,
	Settings,
	Logout,
} from "tabler-icons-react";

function Navigaton() {
	const [opened, setOpened] = useState(false);

	const [submit, setSubmit] = useState(false);

	const notifications = useNotifications();

	const schema = z.object({
		username: z
			.string()
			.nonempty("Field is required")
			.min(2, { message: "Name should have at least 2 letters" }),
		email: z
			.string()
			.nonempty("Field is required")
			.email({ message: "Invalid email" }),
	});

	async function getUserData() {
		const res = await axios.get(
			"https://tickety-tickets.herokuapp.com/api/get-user-data",
			{
				headers: {
					accesstoken: localStorage.getItem("token"),
				},
			}
		);
		return res.data;
	}

	const { data, status, refetch } = useQuery("userdata", getUserData);

	const form = useForm({
		schema: zodResolver(schema),
		initialValues: {
			username: "",
			password: "",
			email: "",
		},
	});

	if (status === "loading") {
		return (
			<Box sx={{ maxWidth: 500 }} mx="auto">
				<Skeleton height={8} radius="xl" />
				<Skeleton height={8} mt={6} radius="xl" />
				<Skeleton height={8} mt={6} width="70%" radius="xl" />
			</Box>
		);
	}

	if (status === "error") {
		return <p>error!</p>;
	}

	function SetForm() {
		form.setValues({
			username: data.username,
			email: data.email,
		});
		setOpened(true);
	}

	async function UpdateUser() {
		try {
			const user = await axios.post(
				"https://tickety-tickets.herokuapp.com/api/update-user",
				{
					accestoken: localStorage.getItem("token"),
					username: form.values.username,
					email: form.values.email,
					password: form.values.password,
				}
			);
			if (user) {
				if (user.data.status === "ok") {
					notifications.showNotification({
						title: "Successfully changed user settings",
						message: "You need to log in again",
						color: "green",
						loading: false,
						icon: <Check />,
						disallowClose: true,
					});
					form.reset();
					refetch();
					handleLogout();
				} else {
					notifications.showNotification({
						title: "There was an error",
						message: "Couldn't change user settings",
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

	async function deleteUser() {
		try {
			const user = await axios.post(
				"https://tickety-tickets.herokuapp.com/api/delete-user",
				{
					accestoken: localStorage.getItem("token"),
				}
			);

			if (user.data.status === "ok") {
				notifications.showNotification({
					title: "Successfully deleted user",
					color: "green",
					loading: false,
					icon: <Check />,
					disallowClose: true,
				});
				refetch();
				handleLogout();
				setSubmit(true);
			} else {
				notifications.showNotification({
					title: "There was an error",
					message: "User couldn't be deleted",
					color: "red",
					loading: false,
					icon: <X />,
					disallowClose: true,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		notifications.showNotification({
			title: "Successfully logged out",
			color: "green",
			loading: false,
			icon: <Check />,
			disallowClose: true,
		});
		refetch();
	};

	return (
		<div>
			{submit ? (
				<Navigate to="/login" replace={true} />
			) : (
				<Header height={40}>
					<Group position="apart" style={{ marginBottom: 5 }}>
						<Link as={Link} to="/" style={{ textDecoration: "none" }}>
							<Text
								weight={700}
								size="xl"
								ml="sm"
								variant="gradient"
								gradient={{ from: "blue", to: "inidgo", deg: 180 }}
							>
								Tickety
							</Text>
						</Link>

						<Group>
							<Box>
								{data.username ? (
									<Group position="apart">
										<Text size="xl">{data.username}</Text>
										<Menu trigger="hover" delay={500}>
											<Menu.Item
												icon={<Settings size={14} />}
												onClick={() => SetForm()}
											>
												Settings
											</Menu.Item>
											<Divider />
											<Menu.Item
												color="red"
												icon={<Logout size={14} />}
												onClick={() => handleLogout()}
											>
												Log Out
											</Menu.Item>
										</Menu>
									</Group>
								) : (
									<Box>
										<Text size="md">
											<Link
												to="/login"
												style={{
													textDecoration: "none",
													margin: "10px",
													color: "white",
												}}
											>
												Login
											</Link>
											/
											<Link
												to="/register"
												style={{
													textDecoration: "none",
													margin: "10px",
													color: "white",
												}}
											>
												Register
											</Link>
										</Text>
									</Box>
								)}
							</Box>
						</Group>
					</Group>

					<Modal
						opened={opened}
						onClose={() => setOpened(false)}
						title="Update user settings"
					>
						<form onSubmit={form.onSubmit(UpdateUser)}>
							<TextInput
								placeholder="Your username"
								label="New username"
								size="md"
								{...form.getInputProps("username")}
								mt="sm"
							/>
							<TextInput
								placeholder="example@mail.com"
								label="New email"
								size="md"
								{...form.getInputProps("email")}
								mt="sm"
							/>
							<PasswordInput
								placeholder="New password"
								icon={<Lock />}
								label="new password"
								size="md"
								visibilityToggleIcon={({ reveal, size }) =>
									reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
								}
								{...form.getInputProps("password")}
								mt="sm"
							/>
							<Button
								variant="outline"
								color="lime"
								type="submit"
								mx="20"
								mt="sm"
							>
								Update user
							</Button>
							<Button
								variant="outline"
								color="red"
								mx="20"
								mt="sm"
								ml="md"
								onClick={() => deleteUser()}
							>
								Delete user
							</Button>
						</form>
					</Modal>
				</Header>
			)}
		</div>
	);
}

export default Navigaton;
