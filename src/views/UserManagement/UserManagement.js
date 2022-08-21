import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const UserManagement = ({ currentUser }) => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	const handleNav = (id) => {
		navigate(`/users/edit/${id}`, { replace: true });
	};

	const handleNavCreate = () => {
		navigate(`/users/create`, { replace: true });
	};

	const fetchAvaliableUsers = async () => {
		try {
			const res = await api.get("/users");
			setUsers(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			console.log("test");
			await api.delete(`/users/user/${id}`);
			const filteredArray = users.filter((user) => user._id !== id);
			setUsers(filteredArray);
			console.log("test 2");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAvaliableUsers();
	}, []);

	return (
		<Grid container>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h3'>User management</Typography>
				</Grid>
				<Grid item>
					<Button onClick={handleNavCreate} variant='contained' color='primary'>
						Create a new user
					</Button>
				</Grid>
				{users.map((user, index) => (
					<Grid key={user._id} container mt={10}>
						<Grid item xs={1}>
							<Typography variant='h5'>{index + 1}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography variant='h5'>
								{user.firstName} {user.lastName}
							</Typography>
						</Grid>
						<Grid item xs={2} mr={2}>
							<Button
								variant='contained'
								color='warning'
								fullWidth
								onClick={(e) => handleNav(user._id)}
								disabled={currentUser._id === user._id}>
								Edit
							</Button>
						</Grid>
						<Grid item xs={3} mb={1} mr={2}>
							<Button
								color='error'
								variant='contained'
								fullWidth
								onClick={(e) => handleDelete(user._id)}
								disabled={currentUser._id === user._id}>
								Delete user
							</Button>
						</Grid>
						<Grid item xs={3} mb={1}>
							<Button
								color='success'
								variant='contained'
								fullWidth
								disabled={currentUser._id === user._id}>
								Resend confirmation email
							</Button>
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
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.auth.user,
});

export default connect(mapStateToProps, {})(UserManagement);
