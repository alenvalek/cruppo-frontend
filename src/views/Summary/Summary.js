import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { setProject } from "../../store/actions/project";
import { connect } from "react-redux";
import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { flushSync } from "react-dom";

const Summary = ({ setProject }) => {
	const projectID = useParams().projectid;

	const [summary, setSummary] = useState(null);
	const [config, setConfig] = useState(null);
	const [chart, setChart] = useState(null);
	useEffect(() => {
		setProject(projectID);
	}, []);

	const fetchSummary = async () => {
		console.log("DEV: ", projectID);
		const res = await api.get(`/projects/${projectID}/summary`);
		console.log(res.data);
		setSummary(res.data);
	};

	const handleData = async () => {
		await fetchSummary();
		if (summary) {
			const configNew = {
				type: "pie",
				data: {
					labels: ["To do", "In progress", "In review", "Done"],
					datasets: [
						{
							label: "Project stats",
							data: [
								summary.todo.length,
								summary.progress.length,
								summary.review.length,
								summary.done.length,
							],
							backgroundColor: [
								"rgb(255, 99, 132)",
								"rgb(54, 162, 235)",
								"rgb(255, 205, 86)",
								"rgb(100, 50, 86)",
							],
							hoverOffset: 4,
						},
					],
				},
			};
			setConfig(configNew);
		}
	};

	const handleGraph = () => {
		if (chart) {
			chart.destroy();
		}
		if (config) {
			const chartRef = document.getElementById("chart");
			const chart = new Chart(chartRef, config);
			setChart(chart);
		}
	};

	useEffect(() => {
		handleData();

		if (!chart) {
			handleGraph();
		}
	}, [summary]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Summary</Typography>
			</Grid>
			<Grid container justifyContent='center'>
				<Grid item xs={6} mt={10}>
					<Typography variant='h5'>Done percentage: </Typography>
				</Grid>
				<Grid item xs={6} mt={10}>
					<Typography variant='h5'>Tasks left to do: </Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>
						{summary ? summary.donePerc : <>0</>}%
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>
						{summary && summary.todo && summary.todo.length}
					</Typography>
				</Grid>
				<Grid item xs={6} mt={10}>
					<Typography variant='h5'>Tasks in review: </Typography>
				</Grid>
				<Grid item xs={6} mt={10}>
					<Typography variant='h5'>Tasks in progress: </Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>
						{summary && summary.review && summary.review.length}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>
						{summary && summary.progress && summary.progress.length}
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} mt={10}>
				<Typography variant='h4' mb={3}>
					Graph project visualisation
				</Typography>
				<canvas id='chart' style={{ maxHeight: 500, maxWidth: 500 }}></canvas>
			</Grid>
			<Button onClick>Debug</Button>
		</Grid>
	);
};
export default connect(null, { setProject })(Summary);
