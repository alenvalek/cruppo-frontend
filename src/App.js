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
import Project from "./views/Project/Project";
import Summary from "./views/Summary/Summary";
import Activity from "./views/Activity/Activity";
import UserManagement from "./views/UserManagement/UserManagement";

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
							<Route path='/activity' element={<Activity />} />
							<Route path='/projects' element={<Projects />} />
							<Route path='/users' element={<UserManagement />} />
							<Route path='/projects/:projectid/board' element={<Project />} />
							<Route
								path='/projects/:projectid/summary'
								element={<Summary />}
							/>
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
