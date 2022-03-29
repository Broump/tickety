import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { Box, Button, Center, Image } from "@mantine/core";

import { ArrowUpRightCircle } from "tabler-icons-react";

function Home() {
	const [submit, setSubmit] = useState(false);

	return (
		<Center mt="xl">
			<Box sx={{ maxWidth: 800 }} mx="auto">
				{submit ? (
					<Navigate to="/process" replace={true} />
				) : (
					<Box>
						<Center>
							<Button
								color="green"
								variant="filled"
								size="xl"
								mt="xl"
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
