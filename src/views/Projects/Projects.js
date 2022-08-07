import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectDataTable from "../../components/ProjectDataTable/ProjectDataTable";
import styles from "./Projects.module.css";

const Projects = () => {
	const projectMockUps = [
		{
			id: 1,
			name: "Blog content",
			type: "Content Managmenet Project",
		},
		{
			id: 2,
			name: "Blog finances",
			type: "Sales Projects",
		},
		{
			id: 3,
			name: "Blog interface design",
			type: "UI/UX Project",
		},
	];

	return (
		<Grid container>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h3'>Projects</Typography>
				</Grid>
				<Grid item>
					<Button variant='contained' color='primary'>
						Create project
					</Button>
				</Grid>
			</Grid>
			<Grid container mt={4}>
				<Grid item xs={12} md={12}>
					<Typography variant='body1'>
						<strong>Favorite projects</strong>
					</Typography>
				</Grid>
				<Grid item xs={12} md={12}>
					<div className={styles.projectListContainer}>
						<ul className={styles.projectList}>
							{projectMockUps.map((project) => (
								<li>
									<ProjectCard type={project.type} name={project.name} />
								</li>
							))}
						</ul>
					</div>
				</Grid>
				<Grid item xs={12}>
					<ProjectDataTable />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Projects;
