import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = ({ user, loginUser }) => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			loginUser(values.email, values.password);
		},
	});

	useEffect(() => {
		if (user) {
			navigate("/home");
		}
	}, [user]);

	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			justifyContent='center'
			minHeight='80vh'>
			<Grid item xs={12} md={12}>
				<Paper elevation={10} sx={{ padding: "2rem", width: "500px" }}>
					<Grid
						container
						direction='column'
						alignItems='center'
						justifyContent='center'
						gap='1rem'>
						<Grid item xs={12}>
							<Avatar
								sx={{
									marginX: "auto",
									backgroundColor: "#2196f3",
									width: "5rem",
									height: "5rem",
								}}>
								<AccountCircleIcon sx={{ height: "100%", width: "100%" }} />
							</Avatar>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h2'>Login</Typography>
						</Grid>
						<TextField
							label='E-mail'
							name='email'
							variant='outlined'
							fullWidth
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						<TextField
							label='Password'
							type='password'
							name='password'
							variant='outlined'
							fullWidth
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={formik.handleSubmit}>
							Login
						</Button>
						<Link to='/account-recovery'>Forgot your credentials?</Link>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { loginUser })(Login);
