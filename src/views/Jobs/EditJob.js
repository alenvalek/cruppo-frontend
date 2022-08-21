import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const EditJob = () => {
	const [positionName, setPositionName] = useState("");
	const [recSalary, setRecSalary] = useState(0);
	const [description, setDescription] = useState("");
	const [canMakeProjects, setCanMakeProjects] = useState(false);

	const { jobid } = useParams();

	const handleSubmit = async () => {
		try {
			let editedJob = {
				positionName: positionName,
				recommendedSalary: recSalary,
				canStartProject: canMakeProjects,
			};
			if (description) editedJob.description = description;

			await api.patch(`/roles/${jobid}`, editedJob);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchJob = async () => {
		try {
			const res = await api.get(`/roles/${jobid}`);
			const data = res.data;
			console.log(data);
			setPositionName(data.positionName);
			setRecSalary(data.recommendedSalary);
			setCanMakeProjects(data.canStartProject);
			if (data.description) setDescription(data.description);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchJob();
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Edit Job</Typography>
			</Grid>
			<Grid item xs={12} my={2}>
				<TextField
					fullWidth
					label='Position name'
					variant='filled'
					value={positionName}
					onChange={(e) => setPositionName(e.target.value)}></TextField>
			</Grid>
			<Grid item xs={12} my={2}>
				<TextField
					fullWidth
					type='number'
					label='Recommended salary'
					variant='filled'
					value={recSalary}
					onChange={(e) => setRecSalary(e.target.value)}></TextField>
			</Grid>
			<Grid item xs={12} my={2}>
				<TextField
					fullWidth
					label='Description (optional)'
					variant='filled'
					value={description}
					onChange={(e) => setDescription(e.target.value)}></TextField>
			</Grid>
			<Grid item xs={12} my={2}>
				<FormControlLabel
					control={
						<Checkbox
							checked={canMakeProjects}
							onChange={(e) => setCanMakeProjects(!canMakeProjects)}
						/>
					}
					label='Can make projects'
				/>
			</Grid>
			<Grid item xs={12} my={2}>
				<Button
					color='secondary'
					variant='contained'
					fullWidth
					onClick={handleSubmit}>
					Save changes
				</Button>
			</Grid>
		</Grid>
	);
};

export default EditJob;
