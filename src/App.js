import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Login from "./views/Login/Login";
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
import NewProject from "./views/Projects/NewProject";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetProject, setProject } from "./store/actions/project";
import ManageTeam from "./views/ManageTeam/ManageTeam";
import { Alert } from "@mui/material";
import UserEdit from "./views/UserManagement/UserEdit";
import UserCreate from "./views/UserManagement/UserCreate";
import Jobs from "./views/Jobs/Jobs";
import CreateJob from "./views/Jobs/CreateJob";
import EditJob from "./views/Jobs/EditJob";
import Complaints from "./views/Complaints/Complaints";
import CreateComplaint from "./views/Complaints/CreateComplaint";
import ComplaintDetails from "./views/Complaints/ComplaintDetails";
import Confirm from "./views/Confirm/Confirm";

function App({ loadUserData, user, loading, resetProject }) {
	const projectID = useParams().projectID;

	window.onpopstate = (state) => {
		if (!projectID) {
			resetProject();
		}
	};

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<>
			{/* <Navbar /> */}
			<RDrawer>
				{user && user.hasTempPassword && (
					<Alert color='warning' variant='filled'>
						You still haven't confirmed your account, please check your email,
						confirm your account and change your password.
					</Alert>
				)}
				<Routes>
					{!user && !loading ? (
						<>
							<Route path='/' element={<Login />} />
							<Route path='/confirm/:token' element={<Confirm />} />
						</>
					) : (
						<Route element={<PrivateRoutes />}>
							<Route path='/' element={<Home />} />
							<Route path='/confirm/:token' element={<Confirm />} />
							<Route path='/activity' element={<Activity />} />
							<Route path='/complaints' element={<Complaints />} />
							<Route
								path='/complaints/:complaintid'
								element={<ComplaintDetails />}
							/>
							<Route path='/create-complaint' element={<CreateComplaint />} />
							<Route path='/jobs' element={<Jobs />} />
							<Route path='/jobs/create' element={<CreateJob />} />
							<Route path='/jobs/edit/:jobid' element={<EditJob />} />
							<Route path='/users' element={<UserManagement />} />
							<Route path='/users/create' element={<UserCreate />} />
							<Route path='/users/edit/:userid' element={<UserEdit />} />
							<Route path='/projects' element={<Projects />} />
							<Route path='/projects/new' element={<NewProject />} />
							<Route path='/projects/:projectid/board' element={<Project />} />
							<Route
								path='/projects/:projectid/team'
								element={<ManageTeam />}
							/>
							<Route
								path='/projects/:projectid/summary'
								element={<Summary />}
							/>
						</Route>
					)}
				</Routes>
				<ToastContainer theme='colored' />
			</RDrawer>
		</>
	);
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {
	loadUserData,
	setProject,
	resetProject,
})(App);
