import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

const Spinner = () => {
	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			minHeight='80vh'>
			<Grid item>
				<CircularProgress size='10rem' color='primary' />
			</Grid>
		</Grid>
	);
};

export default Spinner;
