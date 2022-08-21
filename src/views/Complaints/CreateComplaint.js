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

const CreateComplaint = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [isAnon, setIsAnon] = useState(false);

	const clearState = () => {
		setTitle("");
		setBody("");
		setIsAnon(false);
	};

	const handleSubmit = async () => {
		try {
			await api.post("/complaints", {
				title,
				body,
				isAnon,
			});
		} catch (error) {
			console.log(error);
		}
		clearState();
	};

	return (
		<Grid>
			<Grid item xs={12}>
				<Typography variant='h3'>File a new complaint</Typography>
			</Grid>
			<Grid item xs={12} mt={2}>
				<TextField
					fullWidth
					variant='filled'
					label='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} mt={2}>
				<TextField
					multiline
					minRows={5}
					variant='filled'
					fullWidth
					label='Complaint body'
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} mt={2}>
				<FormControlLabel
					control={
						<Checkbox
							checked={isAnon}
							onChange={(e) => setIsAnon((prev) => !prev)}
						/>
					}
					label='Is anonymous'
				/>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					color='secondary'
					variant='contained'
					onClick={handleSubmit}>
					File a complaint
				</Button>
			</Grid>
		</Grid>
	);
};

export default CreateComplaint;
