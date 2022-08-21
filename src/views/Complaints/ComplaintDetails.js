import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const ComplaintDetails = () => {
	const [complaint, setComplaint] = useState(null);
	const { complaintid } = useParams();

	const fetchDetails = async () => {
		try {
			const res = await api.get(`/complaints/${complaintid}`);
			setComplaint(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchDetails();
	}, []);

	return (
		<>
			{complaint ? (
				<Grid>
					<Grid>
						<Typography variant='h3'>
							Complaint - {complaint.title} -{" "}
							{complaint.employee ? (
								<>
									{complaint.employee.firstName} {complaint.employee.lastName}
								</>
							) : (
								"Anonymous"
							)}
						</Typography>
					</Grid>
					<Grid item xs={12} mt={4}>
						<Typography variant='h5'>{complaint.body}</Typography>
					</Grid>
				</Grid>
			) : (
				"Loading or not found"
			)}
		</>
	);
};

export default ComplaintDetails;
