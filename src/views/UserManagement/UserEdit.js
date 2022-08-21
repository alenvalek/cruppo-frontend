import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const UserEdit = () => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [salary, setSalary] = useState(0);
	const [jobPosition, setJobPosition] = useState("");
	const [roles, setRoles] = useState([]);
	const [role, setRole] = useState("");

	const { userid } = useParams();

	const fetchRoles = async () => {
		try {
			const res = await api.get("/roles");
			setRoles(res.data);
		} catch (error) {
			toast.error(error.response.data.msg || "Unknown error", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log(error);
		}
	};

	const fetchUserData = async () => {
		try {
			const res = await api.get(`/users/user/${userid}`);
			const data = res.data;
			setEmail(data.email);
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setSalary(data.salary);
			setJobPosition(data.position);
			setRole(data.role);
		} catch (error) {
			toast.error(error.response.data.msg || "Unknown error", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		try {
			console.log("woow");
			await api.patch(`users/user/${userid}`, {
				email,
				firstName,
				lastName,
				salary,
				position: jobPosition,
				role,
			});
			toast.success("Successfully updated the information.", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			toast.error(error.response.data.msg || "Unknown error", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRoles();
		fetchUserData();
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Edit user</Typography>
			</Grid>
			<Grid item xs={12} mb={2} mt={4}>
				<TextField
					fullWidth
					variant='filled'
					label='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} my={2}>
				<TextField
					fullWidth
					variant='filled'
					label='First Name'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} my={2}>
				<TextField
					fullWidth
					variant='filled'
					label='Last Name'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} my={2}>
				<TextField
					fullWidth
					type='number'
					variant='filled'
					label='Salary'
					value={salary}
					onChange={(e) => setSalary(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} my={2}>
				<FormControl sx={{ width: "100%" }}>
					<InputLabel id='id'>Job position</InputLabel>
					<Select
						labelId='id'
						value={jobPosition}
						onChange={(e, newValue) => setJobPosition(newValue)}>
						{roles.map((r) => (
							<MenuItem key={r._id} value={r._id}>
								{r.positionName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} my={2}>
				<FormControl sx={{ width: "100%" }}>
					<InputLabel id='id'>Access level</InputLabel>
					<Select
						labelId='id'
						value={role}
						onChange={(e, newValue) => setRole(newValue)}>
						<MenuItem value='employee'>Employee</MenuItem>
						<MenuItem value='admin'>Admin</MenuItem>
						<MenuItem value='hr'>HR</MenuItem>
						<MenuItem value='owner'>Owner</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					variant='contained'
					color='secondary'
					onClick={handleSubmit}>
					Save changes
				</Button>
			</Grid>
		</Grid>
	);
};

export default UserEdit;
