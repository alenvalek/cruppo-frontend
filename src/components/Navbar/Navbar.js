import { AppBar, Box, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
	return (
		<Box sx={{ flexGrow: 1, display: "flex" }}>
			<AppBar position='fixed'>
				<Toolbar>
					<Typography noWrap variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Cruppo
					</Typography>
					<Button color='inherit' LinkComponent={Link} to='/'>
						Job application
					</Button>
					<Button color='inherit' link>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
