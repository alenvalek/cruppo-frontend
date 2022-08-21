import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectDataTable from "../../components/ProjectDataTable/ProjectDataTable";
import styles from "./Projects.module.css";
import { toast } from "react-toastify";
import api from "../../api/api";
import { flushSync } from "react-dom";

const Projects = () => {
	const navigate = useNavigate();

	const [projects, setProjects] = useState([]);

	const handleNav = (e) => {
		navigate("/projects/new", { replace: true });
	};

	const fetchProjects = async () => {
		try {
			const res = await api.get("/projects");
			setProjects(res.data);
		} catch (error) {
			toast.error(error.response.data.msg || "Unknown error", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<Grid container>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h3'>Projects</Typography>
				</Grid>
				<Grid item>
					<Button variant='contained' color='primary' onClick={handleNav}>
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
							{projects &&
								projects.length > 0 &&
								projects.map((project, index) => {
									console.log(project);
									return (
										<li key={index}>
											<ProjectCard
												type={project.projectType}
												name={project.projectType}
											/>
										</li>
									);
								})}
						</ul>
					</div>
				</Grid>
				<Grid item xs={12}>
					<ProjectDataTable data={projects} />
				</Grid>
			</Grid>
			<Button onClick={() => console.log(projects)}>Debug</Button>
		</Grid>
	);
};

export default Projects;
