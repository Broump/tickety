import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ProtectedRoute from "./components/protectedRoute";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import Navigaton from "./components/navigaton";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<Navigaton />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/tickets" element={<Tickets />} />
				</Route>
				<Route path="*" element={<div>404 Not Found!</div>} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
