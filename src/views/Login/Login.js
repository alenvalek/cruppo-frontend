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

const Login = () => {
	return (
		<Grid
			container
			direction='column'
			alignItems='center'
			justifyContent='center'
			minHeight='100vh'>
			<Grid item xs={12} md={12}>
				<Paper elevation={10} sx={{ padding: "2rem", width: "300px" }}>
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
						/>
						<TextField
							label='Password'
							type='password'
							name='password'
							variant='outlined'
							fullWidth
						/>
						<Button fullWidth variant='contained' color='primary'>
							Login
						</Button>
						<Link to='/account-recovery'>Forgot your credentials?</Link>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Login;
