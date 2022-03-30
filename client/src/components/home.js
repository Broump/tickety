import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { Box, Button, Center, Table, Title } from "@mantine/core";

import { ArrowUpRightCircle } from "tabler-icons-react";

function Home() {
	const [submit, setSubmit] = useState(false);

	const tickets = [
		{
			name: "defect notebook",
			categorie: "notebook",
			description: "it won't start",
			status: "to-do",
			who: "James",
			id: 0,
		},
		{
			name: "windows won't start",
			categorie: "widnows",
			description: "blueescreen",
			status: "doing",
			who: "Micheal",
			id: 1,
		},
		{
			name: "no network",
			categorie: "network",
			description: "mabye the network cable",
			status: "finished",
			who: "Rick",
			id: 2,
		},
		{
			name: "forgotten password",
			categorie: "system",
			description: "reset",
			status: "to-do",
			who: "Morty",
			id: 3,
		},
	];

	const rows = tickets.map((ticket) => (
		<tr key={ticket.id}>
			<td>{ticket.name}</td>
			<td>{ticket.categorie}</td>
			<td>{ticket.description}</td>
			<td>{ticket.status}</td>
			<td>{ticket.who}</td>
		</tr>
	));

	return (
		<Center mt="xl">
			<Box sx={{ maxWidth: 800 }} mx="auto">
				{submit ? (
					<Navigate to="/tickets" replace={true} />
				) : (
					<Box>
						<Center>
							<Title order={1}>Tickety - ticket system</Title>
						</Center>
						<Center>
							<Table mt={50}>
								<thead>
									<tr>
										<th>Name</th>
										<th>Categorie</th>
										<th>Description</th>
										<th>Status</th>
										<th>Who</th>
									</tr>
								</thead>
								<tbody>{rows}</tbody>
							</Table>
						</Center>
						<Center>
							<Button
								color="blue"
								variant="filled"
								size="xl"
								mt={50}
								leftIcon={<ArrowUpRightCircle size={30} />}
								onClick={() => setSubmit(true)}
							>
								Get Started
							</Button>
						</Center>
					</Box>
				)}
			</Box>
		</Center>
	);
}

export default Home;
