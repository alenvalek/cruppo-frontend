import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import api from "../../api/api";
import { toast } from "react-toastify";

const NewProject = () => {
	const formik = useFormik({
		initialValues: {
			title: "",
			type: "",
			tag: "",
			department: "",
			url: "",
		},
		onSubmit: async (values) => {
			try {
				await api.post("/projects", {
					projectTitle: values.title,
					projectType: values.type,
					projectTag: values.tag,
					projectDepartment: values.department,
					url: values.url,
				});
				toast.success("Succesfully created a new project", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
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
		},
	});

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>New project</Typography>
			</Grid>
			<Grid item xs={12} mt={3}>
				<TextField
					name='title'
					variant='standard'
					sx={{ width: "50%" }}
					label='Project title'
					onChange={formik.handleChange}
					value={formik.values.title}
				/>
			</Grid>
			<Grid item xs={12} mt={3}>
				<TextField
					name='type'
					variant='standard'
					sx={{ width: "50%" }}
					label='Project type'
					onChange={formik.handleChange}
					value={formik.values.type}
				/>
			</Grid>
			<Grid item xs={12} mt={3}>
				<TextField
					name='tag'
					variant='standard'
					sx={{ width: "50%" }}
					label='Project tag'
					onChange={formik.handleChange}
					value={formik.values.tag}
				/>
			</Grid>
			<Grid item xs={12} mt={3}>
				<TextField
					name='department'
					variant='standard'
					sx={{ width: "50%" }}
					label='Project department'
					onChange={formik.handleChange}
					value={formik.values.department}
				/>
			</Grid>
			<Grid item xs={12} mt={3}>
				<TextField
					name='url'
					variant='standard'
					sx={{ width: "50%" }}
					label='URL (github/figma..) [optional]'
					onChange={formik.handleChange}
					value={formik.values.url}
				/>
			</Grid>
			<Grid item xs={12} mt={3}>
				<Button
					variant='contained'
					sx={{ width: "50%" }}
					color='secondary'
					onClick={formik.handleSubmit}>
					Create a new project
				</Button>
			</Grid>
		</Grid>
	);
};

export default NewProject;
