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
import api from "../../api/api";
import { toast } from "react-toastify";

const UserCreate = () => {
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [salary, setSalary] = useState(0);
	const [jobPosition, setJobPosition] = useState("");
	const [jobPositions, setjobPositions] = useState([]);
	const [role, setRole] = useState("employee");

	const fetchRoles = async () => {
		try {
			const res = await api.get("/roles");
			setjobPositions(res.data);
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
			await api.post(`users`, {
				email,
				firstName,
				lastName,
				salary,
				position: jobPosition,
				role,
			});
			toast.success("Successfully created a new user", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			clearForm();
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

	const clearForm = () => {
		setEmail("");
		setFirstName("");
		setLastName("");
		setSalary(0);
	};

	useEffect(() => {
		fetchRoles();
	}, []);

	useEffect(() => {
		if (jobPositions && jobPositions.length > 0 && !jobPosition) {
			setJobPosition(jobPositions[0]._id);
		}
	}, [jobPositions]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Create user</Typography>
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
					label={jobPosition && `Salary`}
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
						{jobPositions.map((r) => (
							<MenuItem key={r._id} value={r._id}>
								{r.positionName} (recommended salary: {r.recommendedSalary})
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
					Create user
				</Button>
			</Grid>
		</Grid>
	);
};

export default UserCreate;
