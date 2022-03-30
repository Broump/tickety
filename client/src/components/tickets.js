import React, { useState } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";

import {
	TextInput,
	PasswordInput,
	Button,
	Box,
	Text,
	Modal,
	Tooltip,
	NumberInput,
	Popover,
	Mark,
	List,
	Card,
	Badge,
	Group,
	ActionIcon,
	Skeleton,
	Divider,
	Center,
	Select,
	Textarea,
	Table,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { DatePicker, DateRangePicker } from "@mantine/dates";

import {
	EyeCheck,
	EyeOff,
	Trash,
	QuestionMark,
	X,
	Check,
	Settings,
	Lock,
	CirclePlus,
	Edit,
} from "tabler-icons-react";

import axios from "axios";

function Tickets() {
	const [openedModal, setOpenedModal] = useState(false);

	const [selectData, setSelectData] = useState([
		"Windows",
		"Notebook",
		"Netzwerk",
		"Router",
	]);

	const [selectStatus, setSelectStatus] = useState([
		"to do",
		"doing",
		"finished",
	]);

	const notifications = useNotifications();

	const form = useForm({
		initialValues: {
			ticket_name: "",
			ticket_status: "",
			ticket_categorie: "",
			ticket_forWho: "",
			ticket_due_date: "",
			ticket_description: "",
		},
	});

	async function CreateTicket() {
		try {
			const ticket = await axios.post(
				"https://tickety-tickets.herokuapp.com/api/new-ticket",
				{
					accestoken: localStorage.getItem("token"),
					ticket_name: form.values.ticket_name,
					ticket_status: form.values.ticket_status,
					ticket_categorie: form.values.ticket_categorie,
					ticket_forWho: form.values.ticket_forWho,
					ticket_created_date: form.values.ticket_due_date,
					ticket_description: form.values.ticket_description,
				}
			);
			if (ticket) {
				if (ticket.data.status === "ok") {
					refetch();
					notifications.showNotification({
						title: "Successfully created ticket",
						color: "green",
						loading: false,
						icon: <Check />,
						disallowClose: true,
					});
					form.reset();
					setOpenedModal(false);
				} else {
					notifications.showNotification({
						title: "there was an error",
						message: "ticket couldn't be created",
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

	async function getTickets() {
		const res = await axios.get(
			"https://tickety-tickets.herokuapp.com/api/get-tickets",
			{
				headers: {
					accesstoken: localStorage.getItem("token"),
				},
			}
		);
		return res.data;
	}

	async function deleteTicket(ticket_id) {
		try {
			const ticket = await axios.post(
				"https://tickety-tickets.herokuapp.com/api/delete-ticket",
				{
					accestoken: localStorage.getItem("token"),
					ticket_id: ticket_id,
				}
			);

			if (ticket.data.status === "ok") {
				notifications.showNotification({
					title: "Successfully deleted ticket",
					color: "green",
					loading: false,
					icon: <Check />,
					disallowClose: true,
				});
				refetch();
			} else {
				notifications.showNotification({
					title: "there was an error",
					message: "ticket couldn't be deleted",
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

	const { data, status, refetch } = useQuery("ticket", getTickets);

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

	return (
		<Box sx={{ maxWidth: 800 }} mx="auto">
			<Box>
				<Tooltip
					label="create new ticket"
					color="lime"
					radius="xs"
					withArrow
					transition="fade"
					transitionDuration={500}
				>
					<Button
						variant="outline"
						color="blue"
						radius="xs"
						size="md"
						mt="sm"
						onClick={() => setOpenedModal(true)}
					>
						<div>
							<CirclePlus />
						</div>
					</Button>
				</Tooltip>
				{data.length > 0 ? (
					<Box>
						<Table
							fontSize="xl"
							highlightOnHover
							horizontalSpacing="lg"
							verticalSpacing="md"
						>
							<thead>
								<tr>
									<th>Name</th>
									<th>Categorie</th>
									<th>Description</th>
									<th>Status</th>
									<th>Who</th>
								</tr>
							</thead>
							<tbody>
								{data.map((ticket) => (
									<tr key={ticket.ticket_id}>
										<td>{ticket.ticket_name}</td>
										<td>{ticket.ticket_categorie}</td>
										<td>{ticket.ticket_description}</td>
										<td>{ticket.ticket_status}</td>
										<td>{ticket.ticket_forWho}</td>

										<ActionIcon mt={12}>
											<Trash
												size={20}
												color="red"
												onClick={() => deleteTicket(ticket.ticket_id)}
											/>
										</ActionIcon>
									</tr>
								))}
							</tbody>
						</Table>
					</Box>
				) : (
					<Card shadow="sm" p="lg" mt="sm">
						<Text align="center" weight={500}>
							No Tickets yet
						</Text>
					</Card>
				)}

				<Modal
					opened={openedModal}
					centered
					onClose={() => setOpenedModal(false)}
					title="Enter your values!"
				>
					<form onSubmit={form.onSubmit(CreateTicket)}>
						<TextInput
							placeholder="Ticket 1"
							label="Ticket name"
							size="md"
							required
							mt="sm"
							{...form.getInputProps("ticket_name")}
						/>
						<TextInput
							placeholder="Mustermann"
							label="Ticket who"
							size="md"
							mt="sm"
							{...form.getInputProps("ticket_forWho")}
						/>
						<Select
							label="Ticket categorie"
							data={selectData}
							placeholder="Select a categorie"
							nothingFound="Nothing found"
							searchable
							creatable
							clearable
							getCreateLabel={(query) => `+ Create ${query}`}
							onCreate={(query) =>
								setSelectData((current) => [...current, query])
							}
							mt="sm"
							{...form.getInputProps("ticket_categorie")}
						/>
						<Select
							label="Ticket status"
							data={selectStatus}
							placeholder="Select a status"
							nothingFound="Nothing found"
							searchable
							creatable
							clearable
							getCreateLabel={(query) => `+ Create ${query}`}
							onCreate={(query) =>
								setSelectStatus((current) => [...current, query])
							}
							mt="sm"
							{...form.getInputProps("ticket_status")}
						/>
						<Textarea
							mt="sm"
							placeholder="Ticket description"
							label="Ticket description"
							{...form.getInputProps("ticket_description")}
						/>
						{/* <DatePicker
							placeholder="Pick date"
							label="Due date"
							{...form.getInputProps("ticket_due_date")}
						/> */}

						<Button
							variant="outline"
							color="lime"
							type="submit"
							mx="20"
							mt="sm"
						>
							Create ticket
						</Button>
					</form>
				</Modal>
			</Box>
		</Box>
	);
}

export default Tickets;
