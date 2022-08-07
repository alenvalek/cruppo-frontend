import { Grow, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const ProjectCard = ({ name, type }) => {
	return (
		<Grow in={true} appear={true} timeout={1000}>
			<Grid container my={1}>
				<Paper
					elevation={10}
					sx={{
						cursor: "pointer",
						padding: 1,
						width: "300px",
						minHeight: "100px",
					}}>
					<Grid container justifyContent='center' alignItems='center'>
						<Grid item xs={12} md={6} mt={1}>
							<img
								src='https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/08/out-of-office.jpg'
								width='100px'
								style={{ borderRadius: "10px" }}
								height='auto'
								alt='project'
							/>
						</Grid>
						<Grid item xs={12} md={6} mt={1}>
							<Typography variant='body1'>
								<strong>{name}</strong>
							</Typography>
							<Typography variant='body2'>{type}</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grow>
	);
};

export default ProjectCard;
