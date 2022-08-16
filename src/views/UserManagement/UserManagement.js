import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const UserManagement = () => {
	return (
		<Grid container>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h3'>User management</Typography>
				</Grid>
				<Grid item>
					<Button variant='contained' color='primary'>
						Create a new user
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UserManagement;
