import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Jobs = () => {
	const [jobs, setJobs] = useState([]);

	const navigate = useNavigate();

	const fetchJobs = async () => {
		try {
			const res = await api.get("/roles");
			setJobs(res.data);
		} catch (error) {
			toast.error(error.response.data?.msg || "Unknown error", {
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

	const handleNavCreate = () => {
		navigate("/jobs/create", { replace: true });
	};
	const handleNavEdit = (id) => {
		navigate(`/jobs/edit/${id}`, { replace: true });
	};

	const handleDelete = async (id) => {
		try {
			const res = await api.delete(`/roles/${id}`);
			const filteredArray = jobs.filter((job) => job._id !== id);
			setJobs(filteredArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	return (
		<Grid container>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h3'>Jobs</Typography>
				</Grid>
				<Grid item>
					<Button variant='contained' color='primary' onClick={handleNavCreate}>
						New job
					</Button>
				</Grid>
			</Grid>
			<div
				style={{
					height: "1px",
					width: "100%",
					margin: "2rem 0 0 0",
					backgroundColor: "black",
				}}></div>
			{jobs.map((job, index) => (
				<Grid key={job._id} container alignItems='center'>
					<Grid item xs={12} md={1} mt={4}>
						<Typography variant='h4'>{index + 1}</Typography>
					</Grid>
					<Grid item xs={12} md={3} mt={4}>
						<Typography variant='h4'>{job.positionName}</Typography>
					</Grid>
					<Grid item xs={12} md={3} mt={4} mr={2}>
						<Button
							fullWidth
							variant='contained'
							color='warning'
							onClick={(e) => handleNavEdit(job._id)}>
							Edit
						</Button>
					</Grid>
					<Grid item xs={12} md={4} mt={4}>
						<Button
							fullWidth
							variant='contained'
							color='error'
							onClick={(e) => handleDelete(job._id)}>
							Delete
						</Button>
					</Grid>
					<div
						style={{
							height: "1px",
							width: "100%",
							margin: "1rem 0",
							backgroundColor: "black",
						}}></div>
				</Grid>
			))}
		</Grid>
	);
};

export default Jobs;
