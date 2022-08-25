import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

const ProjectDataTable = ({ data }) => {
	const { width, height } = useWindowDimensions();
	let elementCount = 6;
	const columns = [
		{
			field: "projectName",
			headerName: "Name",
			width: width / elementCount,
			renderCell: (params) => (
				<Link to={`/projects/${params.row._id}/board`}>
					{params.row.projectName}
				</Link>
			),
		},
		{
			field: "projectTag",
			headerName: "Tag",
			width: width / elementCount,
		},
		{
			field: "projectType",
			headerName: "Type",
			width: width / elementCount,
		},
		{
			field: "teamLead",
			headerName: "Team Lead",
			width: width / elementCount,
			valueGetter: (params) =>
				params.row.teamLead
					? params.row?.teamLead?.firstName +
					  " " +
					  params.row?.teamLead?.lastName
					: "Unknown or deleted user",
		},
		{
			field: "projectDepartment",
			headerName: "Department",
			width: width / elementCount,
		},
		{
			field: "githubURL",
			headerName: "GitHub URL",
			width: width / elementCount - 100,
			renderCell: (params) =>
				!params.rows?.githubURL ? (
					<a target='_blank' href='https://github.com/alenvalek'>
						Redirect me
					</a>
				) : (
					<span>
						<strong>-</strong>
					</span>
				),
		},
	];

	return (
		<Box sx={{ height: "550px", mt: "2rem", width: "100%" }}>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
				disableSelectionOnClick
				getRowId={(row) => row._id}
			/>
		</Box>
	);
};

export default ProjectDataTable;
