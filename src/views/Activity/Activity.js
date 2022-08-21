import React, { useState, useEffect } from "react";
import { Alert, Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import api from "../../api/api";

const Activity = () => {
	const [activity, setActivity] = useState([]);

	const fetchActivity = async () => {
		try {
			const res = await api.get("/activity");
			setActivity(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchActivity();
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Acitvity logs</Typography>
			</Grid>
			{activity &&
				activity.length > 0 &&
				activity.map((act) => (
					<Grid container>
						<Grid item xs={12} mt={3}>
							<Alert variant='outlined' color='success'>
								<span>{moment(act.createdAt).fromNow()}</span> | User{" "}
								<strong>
									{act.user.firstName} {act.user.lastName}
								</strong>{" "}
								has <strong>{act.actionType}d</strong> a{" "}
								<strong>
									{act.actionEffect === "jobRole"
										? "job role"
										: act.actionEffect}
								</strong>
								.
							</Alert>
						</Grid>
					</Grid>
				))}
		</Grid>
	);
};

export default Activity;
