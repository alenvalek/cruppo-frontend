import React from "react";
import { Alert, Button, Grid, Typography } from "@mui/material";
import moment from "moment";

const Activity = () => {
	const activityLogs = [
		{
			id: 1,
			timestamp: new Date(),
			user: "Alen Valek",
			actionType: "CREATE",
			type: "PROJECT",
			affectedObject: "Blog content",
		},
		{
			id: 2,
			timestamp: new Date(),
			user: "Alen Valek",
			actionType: "UPDATE",
			type: "PROJECT",
			affectedObject: "Blog content",
		},
		{
			id: 3,
			timestamp: new Date(),
			user: "Alen Valek",
			actionType: "DELETE",
			type: "PROJECT",
			affectedObject: "Blog content",
		},
	];

	const handleExportToText = () => {
		/* TODO */
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Acitvity logs</Typography>
			</Grid>
			<Grid item xs={12} mt={3}>
				<Alert variant='outlined' color='success'>
					<span>{moment(new Date()).fromNow()}</span> | User Alen Valek has
					CREATED a project Blog Content.
				</Alert>
			</Grid>
			<Grid item xs={12} mt={3}>
				<Alert variant='outlined' color='success'>
					<span>{moment(new Date()).fromNow()}</span> | User Alen Valek has
					REMOVED user from a project Blog Content team.
				</Alert>
			</Grid>
			<Grid item xs={12} mt={3}>
				<Alert variant='outlined' color='success'>
					<span>{moment(new Date()).fromNow()}</span> | User Alen Valek has
					UPDATED project Blog Content.
				</Alert>
			</Grid>
			<Grid item xs={12} mt={5}>
				<Button variant='contained' fullWidth color='primary'>
					Export to a text file
				</Button>
			</Grid>
		</Grid>
	);
};

export default Activity;
