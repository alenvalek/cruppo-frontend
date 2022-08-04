import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Navbar from "./components/Navbar/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' index element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
