import {
	Autocomplete,
	Button,
	FormControl,
	Grid,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { setProject } from "../../store/actions/project";

const ManageTeam = ({ project, setProject, currentUser }) => {
	const { projectid: id } = useParams();

	const fetchTeamUsers = async () => {
		const res = await api.get(`/users/${project._id}`);
		setUsers(res.data);
	};

	const fetchAvaliableUsers = async (isRefresh = true) => {
		const res = await api.get("/users");
		const array = res.data;
		const actualArray = array.filter(
			(user) => !users.some((userB) => user._id === userB._id)
		);
		setAvaliableUsers(actualArray);
		if (!selectedUser || isRefresh) {
			setSelectedUser(actualArray[0]);
		}
	};

	const [users, setUsers] = useState([]);
	const [avaliableUsers, setAvaliableUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	const addUser = async (userID) => {
		try {
			const res = await api.post(`/projects/${id}/${userID}`);
			console.log(res.data);
			setUsers(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const removeUser = async (userID) => {
		try {
			console.log(userID);
			const res = await api.delete(`/projects/${id}/${userID}`);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setProject(id);
	}, []);

	useEffect(() => {
		if (project) {
			if (users && users.length > 0) {
				fetchAvaliableUsers();
			}
			fetchTeamUsers();
		}
	}, [project, users]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Manage team</Typography>
			</Grid>
			{currentUser._id !== project.teamLead ? (
				<Grid item xs={12}>
					<Typography variant='h6'>
						Can't manage a team that's not yours
					</Typography>
				</Grid>
			) : (
				<Grid item xs={3}>
					{avaliableUsers && avaliableUsers.length > 0 && (
						<>
							<Autocomplete
								disablePortal
								options={avaliableUsers}
								onChange={(e, newValue) => {
									return setSelectedUser(newValue);
								}}
								value={selectedUser}
								getOptionLabel={(option) =>
									`${option.firstName} ${option.lastName}`
								}
								renderInput={(params) => (
									<TextField {...params} label='New user' />
								)}
							/>
							<Button
								variant='contained'
								color='success'
								sx={{ marginTop: "1rem" }}
								onClick={(e) => addUser(selectedUser._id)}>
								Add user
							</Button>
						</>
					)}
				</Grid>
			)}

			{users.map((user, index) => (
				<Grid key={user._id} container mt={10}>
					<Grid item xs={1}>
						<Typography variant='h5'>{index + 1}</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='h5'>
							{user.firstName} {user.lastName}
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='h5'>{user.position.positionName}</Typography>
					</Grid>
					<Grid item xs={3} mb={1}>
						{currentUser._id === project.teamLead && (
							<Button
								color='error'
								variant='outlined'
								onClick={(e) => removeUser(user._id)}
								disabled={currentUser._id === user._id}>
								Remove user from team
							</Button>
						)}
					</Grid>
					<div
						style={{
							width: "100%",
							height: "1px",
							backgroundColor: "black",
						}}></div>
				</Grid>
			))}
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	project: state.project.currentProject,
	currentUser: state.auth.user,
});

export default connect(mapStateToProps, { setProject })(ManageTeam);
