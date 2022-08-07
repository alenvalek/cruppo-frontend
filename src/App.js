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
import Projects from "./views/Projects/Projects";

function App({ loadUserData, user, loading }) {
	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<>
			{/* <Navbar /> */}
			<RDrawer>
				<Routes>
					{!user && !loading ? (
						<Route path='/' element={<Login />} />
					) : (
						<Route element={<PrivateRoutes />}>
							<Route path='/' element={<Home />} />
							<Route path='/projects' element={<Projects />} />
						</Route>
					)}
				</Routes>
			</RDrawer>
		</>
	);
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUserData })(App);
