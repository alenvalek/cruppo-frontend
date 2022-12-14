import { Typography, Grid } from "@mui/material";
import { connect } from "react-redux";

const Home = ({ user, isLoading }) => {
	return (
		<>
			{user && !isLoading && (
				<Grid
					container
					alignItems='center'
					justifyContent='center'
					sx={{ minHeight: "80vh" }}>
					<Typography variant='h2'>
						Welcome, {`${user.firstName}  ${user.lastName}`}
					</Typography>
				</Grid>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isLoading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Home);
