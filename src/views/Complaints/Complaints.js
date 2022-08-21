import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const Complaints = () => {
	const [complaints, setComplaints] = useState([]);

	const navigate = useNavigate();

	const fetchComplaints = async () => {
		try {
			const res = await api.get("/complaints");
			setComplaints(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleNav = (id) => {
		navigate(`/complaints/${id}`, { replace: true });
	};

	useEffect(() => {
		fetchComplaints();
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Complaints</Typography>
			</Grid>
			<div
				style={{
					height: "1px",
					backgroundColor: "black",
					width: "100%",
					marginTop: "2rem",
				}}></div>
			{complaints.map((complaint, index) => (
				<>
					<Grid key={complaint._id} container justifyContent='center'>
						<Grid item xs={3} my={2}>
							<Typography variant='h5'>{index + 1}</Typography>
						</Grid>
						<Grid item xs={3} my={2}>
							<Typography variant='h5'>{complaint.title}</Typography>
						</Grid>
						<Grid item xs={3} my={2}>
							<Typography variant='h5'>
								{complaint.employee ? (
									<>
										{complaint.employee.firstName} {complaint.employee.lastName}
									</>
								) : (
									"Anonymous"
								)}
							</Typography>
						</Grid>
						<Grid item xs={3} my={2}>
							<Button
								color='primary'
								variant='contained'
								onClick={(e) => handleNav(complaint._id)}>
								Details
							</Button>
						</Grid>
					</Grid>
					<div
						style={{
							height: "1px",
							backgroundColor: "black",
							width: "100%",
						}}></div>
				</>
			))}
		</Grid>
	);
};

export default Complaints;
