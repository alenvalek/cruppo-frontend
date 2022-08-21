import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import NavLink from "../NavLink/NavLink";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";

import { logoutUser } from "../../store/actions/auth";
import { useNavigate, useParams } from "react-router-dom";
import { resetProject } from "../../store/actions/project";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoginIcon from "@mui/icons-material/Login";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StorageIcon from "@mui/icons-material/Storage";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const RDrawer = ({
	children,
	user,
	loading,
	logoutUser,
	project,
	resetProject,
}) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const noUserLinks = [
		{
			text: "Login",
			linkTo: "/",
			icon: <LoginIcon />,
		},
		{
			text: "Apply for a job",
			linkTo: "/application",
			icon: <NoteAddIcon />,
		},
	];

	const cleanLogout = () => {
		logoutUser();
		navigate("/", { replace: true });
	};

	const cleanReturn = () => {
		navigate("/projects", { replace: true });
		resetProject();
	};

	const projectLinks = [
		{
			text: "Logout",
			linkTo: false,
			action: () => cleanLogout(),
			icon: <LogoutIcon />,
		},
		{
			text: "Exit the project",
			linkTo: false,
			action: () => cleanReturn(),
			icon: <ExitToAppIcon />,
		},
		{
			text: "Summary",
			linkTo: `/projects/${project?._id}/summary`,
			icon: <SummarizeIcon />,
		},
		{
			text: "Board",
			linkTo: `/projects/${project?._id}/board`,
			icon: <DeveloperBoardIcon />,
		},
		{
			text: "Manage team",
			linkTo: `/projects/${project?._id}/team`,
			icon: <SupervisedUserCircleIcon />,
		},
	];

	const userLinks = [
		{
			text: "Logout",
			linkTo: false,
			action: () => cleanLogout(),
			icon: <LogoutIcon />,
		},
		{
			text: "Home",
			linkTo: "/",
			icon: <HomeIcon />,
		},
		{
			text: "Activity",
			linkTo: "/activity",
			icon: <StorageIcon />,
			perms: ["hr", "admin", "owner"],
		},
		{
			text: "Complaints",
			linkTo: "/complaints",
			icon: <DescriptionIcon />,
			perms: ["hr", "admin", "owner"],
		},
		{
			text: "File a complaint",
			linkTo: "/create-complaint",
			icon: <NoteAddIcon />,
		},
		{
			text: "Jobs",
			linkTo: "/jobs",
			icon: <WorkIcon />,
			perms: ["hr", "admin", "owner"],
		},
		{
			text: "Users",
			linkTo: "/users",
			icon: <PeopleAltIcon />,
			perms: ["hr", "admin", "owner"],
		},
		{
			text: "Projects",
			linkTo: `/projects`,
			icon: <FolderIcon />,
		},
	];

	const [links, setLinks] = React.useState(noUserLinks);
	const projectID = useParams().projectid;
	React.useEffect(() => {
		if (user && project && !loading) {
			setLinks(projectLinks);
		} else if (user && !loading) {
			setLinks(userLinks);
		} else {
			setLinks(noUserLinks);
		}
	}, [user, project, projectID]);

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{ mr: 2, ...(open && { display: "none" }) }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Cruppo
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant='persistent'
				anchor='left'
				open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{links.map((link, index) =>
						!link.perms ? (
							<ListItem key={index} disablePadding>
								{link.action ? (
									<ListItemButton onClick={link.action}>
										<ListItemIcon>{link.icon}</ListItemIcon>
										<ListItemText primary={link.text} />
									</ListItemButton>
								) : (
									<ListItemButton component={NavLink} to={link.linkTo}>
										<ListItemIcon>{link.icon}</ListItemIcon>
										<ListItemText>{link.text}</ListItemText>
									</ListItemButton>
								)}
							</ListItem>
						) : (
							link.perms.includes(user.role) && (
								<ListItem key={index} disablePadding>
									{link.action ? (
										<ListItemButton onClick={link.action}>
											<ListItemIcon>{link.icon}</ListItemIcon>
											<ListItemText primary={link.text} />
										</ListItemButton>
									) : (
										<ListItemButton component={NavLink} to={link.linkTo}>
											<ListItemIcon>{link.icon}</ListItemIcon>
											<ListItemText>{link.text}</ListItemText>
										</ListItemButton>
									)}
								</ListItem>
							)
						)
					)}
				</List>
				<Divider />
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				{!loading ? children : <Spinner />}
			</Main>
		</Box>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.auth.loading,
	project: state.project.currentProject,
});

export default connect(mapStateToProps, { logoutUser, resetProject })(RDrawer);
