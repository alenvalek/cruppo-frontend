import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { setProject } from "../../store/actions/project";
import { connect } from "react-redux";
import Chart from "chart.js/auto";

const Summary = () => {
	const data = {
		labels: ["To do", "In progress", "In review", "Done"],
		datasets: [
			{
				label: "Project stats",
				data: [300, 50, 100, 10],
				backgroundColor: [
					"rgb(255, 99, 132)",
					"rgb(54, 162, 235)",
					"rgb(255, 205, 86)",
					"rgb(100, 50, 86)",
				],
				hoverOffset: 4,
			},
		],
	};

	const config = {
		type: "pie",
		data: data,
	};

	useEffect(() => {
		setProject({ id: 1 });
		const chartRef = document.getElementById("chart");
		let chart = new Chart(chartRef, config);
		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	}, []);

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
					<Typography variant='h5'>32%</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>24</Typography>
				</Grid>
				<Grid item xs={6} mt={10}>
					<Typography variant='h5'>Tasks in review: </Typography>
				</Grid>
				<Grid item xs={6} mt={10}>
					<Typography variant='h5'>Tasks in progress: </Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>5</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant='h5'>12</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} mt={10}>
				<Typography variant='h4' mb={3}>
					Graph project visualisation
				</Typography>
				<canvas id='chart' style={{ maxHeight: 500, maxWidth: 500 }}></canvas>
			</Grid>
		</Grid>
	);
};
export default connect(null, { setProject })(Summary);
