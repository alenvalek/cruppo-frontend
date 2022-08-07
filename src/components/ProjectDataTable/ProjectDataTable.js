import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
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

const rows = [
	{
		id: 1,
		projectName: "Blog content",
		tag: "BC",
		type: "Content Managmenet Project",
		owner: "Pero Perić",
		department: "Content Managmenet",
	},
	{
		id: 2,
		projectName: "Blog finances",
		tag: "BF",
		type: "Sales Projects",
		owner: "Petar Petrić",
		department: "Finances",
	},
	{
		id: 3,
		projectName: "Blog interface design",
		tag: "BID",
		type: "UI/UX Project",
		owner: "Marko Markić",
		department: "Design",
	},
];

export default function ProjectDataTable() {
	const { width, height } = useWindowDimensions();
	let elementCount = 6;
	const columns = [
		{
			field: "projectName",
			headerName: "Name",
			width: width / elementCount,
			editable: true,
		},
		{
			field: "tag",
			headerName: "Tag",
			width: width / elementCount,
			editable: true,
		},
		{
			field: "type",
			headerName: "Type",
			width: width / elementCount,
			editable: true,
		},
		{
			field: "owner",
			headerName: "Owner",
			width: width / elementCount,
			editable: true,
		},
		{
			field: "department",
			headerName: "Department",
			width: width / elementCount,
			editable: true,
		},
		{
			field: "githubURL",
			headerName: "GitHub URL",
			width: width / elementCount - 100,
			editable: true,
		},
	];

	return (
		<Box sx={{ height: "550px", mt: "2rem", width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
				disableSelectionOnClick
			/>
		</Box>
	);
}
