import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import api from "../../api/api";

const CreateJob = () => {
	const [positionName, setPositionName] = useState("");
	const [recSalary, setRecSalary] = useState(0);
	const [description, setDescription] = useState("");
	const [canMakeProjects, setCanMakeProjects] = useState(false);

	const handleSubmit = async () => {
		try {
			let newPosition = {
				positionName: positionName,
				recommendedSalary: recSalary,
				canStartProject: canMakeProjects,
			};
			if (description) newPosition.description = description;

			await api.post("/roles", newPosition);
		} catch (error) {
			console.log(error);
		}
		clearForm();
	};

	const clearForm = () => {
		setPositionName("");
		setRecSalary(0);
		setDescription("");
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>New Job</Typography>
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
							value={canMakeProjects}
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
					Create a job
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreateJob;
