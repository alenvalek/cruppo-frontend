import {
	Alert,
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Confirm = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [userID, setUserID] = useState(null);

	const { token } = useParams();

	const checkToken = async () => {
		try {
			const res = await api.get(`users/confirm/${token}`);
			setUserID(res.data.uid);
			setLoading(false);
			setError("");
		} catch (error) {
			setUserID(null);
			setLoading(false);
			setError(error.response.data.msg || "Unknown error");
		}
	};

	const handleSubmit = async () => {
		try {
			await api.patch(`users/confirm/${userID}`, { password });
			setPassword("");
			setConfirmPassword("");
			toast.success("Successfully changed password and/or confirmed account.", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			navigate("/", { replace: true });
		} catch (error) {
			toast.error(error.response.data?.msg || "Unknown error", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log(error);
		}
	};

	useEffect(() => {
		checkToken();
	}, []);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Account confirmation</Typography>
			</Grid>
			<Grid item xs={12}>
				{userID && userID}
			</Grid>
			{loading && <CircularProgress size={100} />}
			{!loading && error && <Alert color='error'>{error}</Alert>}
			{!loading && userID && (
				<Grid container>
					<Grid item xs={12} my={2}>
						<TextField
							label='Password'
							fullWidth
							type='password'
							variant='filled'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} my={2}>
						<TextField
							label='Confirm Password'
							fullWidth
							type='password'
							variant='filled'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} my={2}>
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							onClick={handleSubmit}>
							Confirm account
						</Button>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

export default Confirm;
