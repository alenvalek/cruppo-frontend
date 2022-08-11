import {
	Avatar,
	Button,
	Grid,
	IconButton,
	Link,
	Modal,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setProject } from "../../store/actions/project";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { range, orderBy } from "lodash";
import ReorderIcon from "@mui/icons-material/Reorder";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentIcon from "@mui/icons-material/AddComment";
import moment from "moment";

const Project = ({ setProject }) => {
	useEffect(() => {
		setProject({ id: 1 });
	}, []);

	const detailModalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "90%",
		backgroundColor: "white",
		border: "1px solid #000",
		borderRadius: 5,
		boxShadow: 24,
		padding: 10,
	};

	const [selectedTask, setSelectedTask] = useState({});

	const _tasks = [
		{
			id: "1",
			text: "Fix the bug on the navbarssssssssssssssssssssssssssssssssssssssssssssss",
			position: 1,
			priority: 3,
			column: "TODO",
		},
		{
			id: "2",
			text: "Change layout of cards @Home",
			position: 2,
			priority: 3,
			column: "TODO",
		},
		{
			id: "3",
			text: "Make pricing cheaper",
			position: 1,
			priority: 1,
			column: "IN_PROGRESS",
		},
		{
			id: "4",
			text: "Do magic with css",
			position: 3,
			priority: 2,
			column: "TODO",
		},
		{ id: "5", text: "Random tip", position: 4, priority: 2, column: "TODO" },
		{
			id: "6",
			text: "Fix unordered list",
			position: 5,
			priority: 1,
			column: "TODO",
		},
		{
			id: "7",
			text: "Make a dark theme",
			position: 6,
			priority: 1,
			column: "TODO",
		},
		{
			id: "8",
			text: "Make a button to switch to dark theme",
			position: 7,
			priority: 1,
			column: "TODO",
		},
		{
			id: "9",
			text: "Release the first iteration",
			position: 8,
			priority: 1,
			column: "TODO",
		},
	];

	const [modalOpen, setModalOpen] = useState(false);
	const [tasks, setTasks] = useState(_tasks);

	const [columns, setColumns] = useState({
		TODO: { id: "1", title: "TO DO" },
		IN_PROGRESS: { id: "2", title: "In progress" },
		IN_REVIEW: { id: "3", title: "In review" },
		DONE: { id: "4", title: "Done" },
	});

	const handleModal = (item) => {
		if (item && item.id) {
			setSelectedTask(item);
		}
		setModalOpen((prev) => !prev);
	};

	const handleDrag = (res) => {
		const { source, destination, draggableId } = res;

		if (!destination || !source) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const isGreater = destination.index > source.index;
		const isInSameColumn = destination.droppableId === source.droppableId;

		let affectedRange = [];

		console.log(res);

		if (isGreater) {
			affectedRange = range(source.index, destination.index + 1);
		} else {
			affectedRange = range(destination.index, source.index);
		}

		let modifiedArray = tasks.map((task) => {
			// ako je drag prema istom column-u
			if (isInSameColumn) {
				if (task.id === draggableId) {
					task.position = destination.index;
					return task;
				} else if (affectedRange.includes(task.position)) {
					if (isGreater) {
						task.position = task.position - 1;
						return task;
					} else {
						task.position = task.position + 1;
						return task;
					}
				} else {
					return task;
				}
			} else {
				const currentColumn = source.droppableId;
				if (task.id === draggableId) {
					task.position = destination.index;
					task.column = destination.droppableId;
					return task;
				} else if (
					task.column !== currentColumn &&
					(task.position > destination.index ||
						task.position === destination.index)
				) {
					task.position = task.position + 1;
					return task;
				} else if (
					currentColumn === task.column &&
					task.position > source.index &&
					tasks.length - 1 !== 1
				) {
					task.position = task.position - 1;
					return task;
				} else {
					return task;
				}
			}
		});
		setTasks(modifiedArray);
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h3'>Board</Typography>
			</Grid>
			<Grid item xs={12}>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						height: "100%",
					}}>
					<DragDropContext onDragEnd={(result) => handleDrag(result)}>
						{Object.entries(columns).map(([id, column]) => {
							return (
								<Droppable key={id} droppableId={id}>
									{(provided, snapshot) => {
										return (
											<>
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														backgroundColor: snapshot.isDraggingOver
															? "#51e898"
															: "#c4c9cc",
														width: 350,
														minHeight: 500,
														margin: "1rem",
														borderRadius: "10px",
													}}>
													<div
														style={{ marginLeft: "1rem", marginTop: ".5rem" }}>
														<Typography variant='body1'>
															<strong>{column.title}</strong>
														</Typography>
													</div>
													{orderBy(tasks, "position").map((item, index) => {
														if (item.column !== id) return;
														return (
															<Draggable
																key={item.id}
																draggableId={item.id}
																index={item.position}>
																{(provided, snapshot) => {
																	return (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			style={{
																				userSelect: "none",
																				padding: "1rem",
																				margin: "1rem",
																				minHeight: "50px",
																				borderRadius: "10px",
																				backgroundColor: snapshot.isDragging
																					? "rgba(255,255,255,.5)"
																					: "rgba(255,255,255,1)",
																				color: "black",
																				...provided.draggableProps.style,
																			}}>
																			<Grid container alignItems='center'>
																				<Grid item xs={1}>
																					<div {...provided.dragHandleProps}>
																						<ReorderIcon />
																					</div>
																				</Grid>
																				<Grid item xs={10} alignItems='center'>
																					<Typography
																						variant='body1'
																						sx={{
																							marginLeft: "1rem",
																							textOverflow: "ellipsis",
																							overflow: "hidden",
																							whiteSpace: "nowrap",
																						}}>
																						{item.text}
																					</Typography>
																				</Grid>
																				<Grid item xs={1}>
																					<IconButton
																						onClick={() => handleModal(item)}>
																						<MoreVertIcon />
																					</IconButton>
																				</Grid>

																				<Grid item xs={12}>
																					{item.priority === 1 && (
																						<Chip
																							label='low priority'
																							sx={{ width: "100%" }}
																							color='primary'
																						/>
																					)}
																					{item.priority === 2 && (
																						<Chip
																							label='low priority'
																							sx={{ width: "100%" }}
																							color='warning'
																						/>
																					)}
																					{item.priority === 3 && (
																						<Chip
																							label='high priority'
																							sx={{ width: "100%" }}
																							color='error'
																						/>
																					)}
																				</Grid>
																			</Grid>
																		</div>
																	);
																}}
															</Draggable>
														);
													})}
													{provided.placeholder}
												</div>
											</>
										);
									}}
								</Droppable>
							);
						})}
					</DragDropContext>
				</div>
			</Grid>
			<Modal open={modalOpen} onClose={handleModal}>
				<Grid
					style={detailModalStyle}
					container
					width={1000}
					alignItems='center'>
					{selectedTask && selectedTask.text && (
						<>
							<Grid item xs={12} md={8}>
								<Grid container>
									<Grid item xs={12}>
										<Typography variant='h3'>Task details</Typography>
									</Grid>
									<Grid item xs={12}>
										{/* TODO: ADD TITLE INSTEAD OF TEXT */}
										<Typography variant='h6'>
											TITLE: {selectedTask.text}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Button
											startIcon={<EditIcon />}
											variant='outlined'
											color='info'
											sx={{ marginRight: "1rem" }}>
											Edit
										</Button>
										<Button
											startIcon={<AddCommentIcon />}
											variant='outlined'
											color='info'
											sx={{ marginRight: "1rem" }}>
											Add a work log
										</Button>
										<Button
											variant='outlined'
											color='info'
											sx={{ marginRight: "1rem" }}>
											Assign self
										</Button>
									</Grid>
									<Grid item xs={6} mt={3}>
										<Typography variant='h6'>Type: Task</Typography>
									</Grid>
									<Grid item xs={6} mt={3}>
										<Typography variant='h6'>
											Status:{" "}
											{selectedTask.column.split("_").join(" ").toLowerCase()}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='h6'>
											Priority: {selectedTask.priority}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant='h6'>
											IsDone: {selectedTask.column === "DONE" ? "yes" : "no"}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='h6'>
											Description: {selectedTask.text}
										</Typography>
									</Grid>
									<Grid item xs={12} mt={3} mb={3}>
										<hr></hr>
									</Grid>

									<Grid item xs={12}>
										<Typography variant='body1'>
											<strong>Activity</strong>
										</Typography>
									</Grid>
									<Grid item xs={12} mt={3}>
										<Grid container>
											<Grid item xs={3}>
												<Typography variant='body1'>
													<strong>DATE</strong>
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Typography variant='body1'>
													<strong>TITLE</strong>
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Typography variant='body1'>
													<strong>URL</strong>
												</Typography>
											</Grid>
											<Grid item xs={3} sx={{ wordBreak: "normal" }}>
												<Typography variant='body1'>
													<strong>Description</strong>
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									{/* MAP THROUGH WORK LOG */}
									<Grid item xs={12}>
										<hr></hr>
										<Grid container>
											<Grid item xs={3}>
												<Typography variant='body1'>
													{moment("20220801").format("DD/MM/YYYY h:mm:ss")}
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Typography variant='body1'>Fixing nav</Typography>
											</Grid>
											<Grid item xs={3}>
												<Link
													target='_blank'
													href='https://github.com/alenvalek/cruppo-frontend/commit/67fa4a84d6f8a4fd22cdb2b44c247751683747f8'
													variant='body1'>
													COMMIT URL
												</Link>
											</Grid>
											<Grid item xs={3} sx={{ wordBreak: "break-word" }}>
												<Typography variant='body1'>
													Some
													descriptionhsdahaushdasssssssssssssssssssssssssssssssssssssssssss
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<hr></hr>
							</Grid>
							<Grid item xs={12} md={4} mt={10}>
								<Grid container alignItems='center'>
									<Grid item xs={3}>
										<Typography variant='h6' ml={2}>
											Assigned:
										</Typography>
									</Grid>
									<Grid
										item
										xs={9}
										display='flex'
										justifyContent='center'
										alignItems='center'
										columnGap={3}>
										<Typography variant='h6'>
											Alen Valek ( System Admin )
										</Typography>
										<Avatar sx={{ bgcolor: "orange" }}>AV</Avatar>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='h6' ml={2}>
											Votes: 0
										</Typography>
									</Grid>
									<Grid item xs={9}>
										<Typography variant='h6' ml={2}>
											Created: {moment("20220811").format("DD/MM/YYYY")}
										</Typography>
									</Grid>
									<Grid item xs={9}>
										<Typography variant='h6' ml={2}>
											Current progress: 50%
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Grid>
			</Modal>
		</Grid>
	);
};

export default connect(null, { setProject })(Project);
