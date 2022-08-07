import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import RDrawer from "./components/Drawer/RDrawer";
import { connect } from "react-redux";
import { loadUserData } from "./store/actions/auth";
import { useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoute/PrivateRoutes";
import Home from "./views/Home";

function App({ loadUserData }) {
	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<>
			{/* <Navbar /> */}
			<RDrawer>
				<Routes>
					<Route path='/' index element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route path='/home' element={<Home />} exact />
					</Route>
				</Routes>
			</RDrawer>
		</>
	);
}

export default connect(null, { loadUserData })(App);
