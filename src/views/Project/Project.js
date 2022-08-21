import {
	Avatar,
	Button,
	Dialog,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	Link,
	MenuItem,
	Modal,
	Select,
	TextField,
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useFormik } from "formik";
import api from "../../api/api";

const Project = ({ setProject, user }) => {
	const id = useParams().projectid;
	const [summary, setSummary] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [isModalEditMode, setIsModalEditMode] = useState(false);

	const [editableTitle, setEditableTitle] = useState("");
	const [editableType, setEditableType] = useState("");
	const [editableDesc, setEditableDesc] = useState("");

	const [logTitle, setLogTitle] = useState("");
	const [logBody, setLogBody] = useState("");
	const [logLink, setLogLink] = useState("");

	const [workLogOpen, setWorkLogOpen] = useState(false);

	const fetchSummary = async () => {
		const res = await api.get(`/projects/${id}/summary`);
		const tasksData = await api.get(`/tasks/${id}`);
		setTasks(tasksData.data.tasks);
		setSummary(res.data);
	};

	const submitLog = async () => {
		try {
			let newLog = {
				title: logTitle,
				body: logBody,
			};
			if (logLink) newLog.link = logLink;
			const res = await api.patch(
				`/tasks/${id}/${selectedTask._id}/worklog`,
				newLog
			);
			setSelectedTask({ ...selectedTask, workLogs: res.data });
			clearLogForm();
			fetchSummary();
		} catch (error) {
			console.error(error);
		}
	};

	const assignSelf = async () => {
		try {
			const res = await api.patch(`/tasks/${id}/${selectedTask._id}/assign`);
			setSelectedTask({ ...selectedTask, asignee: res.data });
			fetchSummary();
		} catch (error) {
			console.log(error);
		}
	};

	const toggleVote = async () => {
		try {
			const res = await api.patch(`/tasks/${id}/${selectedTask._id}/vote`);
			fetchSummary();
			setSelectedTask({ ...selectedTask, votes: res.data });
		} catch (error) {
			console.log(error);
		}
	};

	const clearLogForm = () => {
		setLogBody("");
		setLogLink("");
		setLogTitle("");
	};

	const toggleEdit = async (isPublish = false) => {
		if (isPublish) {
			const res = await api.patch(`/tasks/${id}/${selectedTask._id}/detail`);
			setSelectedTask(res.data);
		}
		setIsModalEditMode(!isModalEditMode);
	};

	useEffect(() => {
		setProject(id);
		fetchSummary();
		console.log(tasks);
	}, []);

	const formik = useFormik({
		initialValues: {
			taskTitle: "",
			taskType: "task",
			taskBody: "",
			priority: "1",
			deadline: new Date(),
		},
		onSubmit: async (values, { resetForm }) => {
			if (
				!values.taskTitle ||
				!values.taskBody ||
				!values.taskType ||
				!values.priority
			) {
				toast.error("All fields are required", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			let newTask = {
				taskTitle: values.taskTitle,
				taskBody: values.taskBody,
				taskType: values.taskType,
				priority: values.priority,
			};
			if (values.deadline !== formik.initialValues.deadline)
				newTask.deadline = values.deadline;
			newTask.position = summary.todo.length + 1;

			try {
				const res = await api.post(`/tasks/${id}`, newTask);
				toast.success("Successfuly added a new task", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log(res.data);
				setTasks([...tasks, res.data]);
				resetForm();
			} catch (error) {
				console.error(error);
				toast.error(error.response.data.msg || "Unknown error", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				resetForm();
			}
		},
	});

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

	const [modalOpen, setModalOpen] = useState(false);

	const [createModal, setCreateModal] = useState(false);

	const [columns, setColumns] = useState({
		TODO: { id: "1", title: "TO DO", colName: "TODO" },
		IN_PROGRESS: { id: "2", title: "In progress", colName: "IN_PROGRESS" },
		IN_REVIEW: { id: "3", title: "In review", colName: "IN_REVIEW" },
		DONE: { id: "4", title: "Done", colName: "DONE" },
	});

	const handleModal = (item) => {
		if (item && item._id) {
			setEditableTitle(item.taskTitle);
			setEditableType(item.taskType);
			setEditableDesc(item.taskBody);
			setSelectedTask(item);
			console.log(editableDesc);
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
				if (task._id === draggableId) {
					task.position = destination.index;
					api.patch(`/tasks/${task._id}/${id}`, {
						newPosition: task.position,
						newColumn: task.column,
					});
					return task;
				} else if (affectedRange.includes(task.position)) {
					if (isGreater) {
						task.position = task.position - 1;
						api.patch(`/tasks/${task._id}/${id}`, {
							newPosition: task.position,
							newColumn: task.column,
						});
						return task;
					} else {
						task.position = task.position + 1;
						api.patch(`/tasks/${task._id}/${id}`, {
							newPosition: task.position,
							newColumn: task.column,
						});
						return task;
					}
				} else {
					return task;
				}
			} else {
				const currentColumn = source.droppableId;
				if (task._id === draggableId) {
					task.position = destination.index;
					task.column = destination.droppableId;
					api.patch(`/tasks/${task._id}/${id}`, {
						newPosition: task.position,
						newColumn: task.column,
					});
					return task;
				} else if (
					task.column !== currentColumn &&
					(task.position > destination.index ||
						task.position === destination.index)
				) {
					task.position = task.position + 1;
					api.patch(`/tasks/${task._id}/${id}`, {
						newPosition: task.position,
						newColumn: task.column,
					});
					return task;
				} else if (
					currentColumn === task.column &&
					task.position > source.index &&
					tasks.length - 1 !== 1
				) {
					task.position = task.position - 1;
					api.patch(`/tasks/${task._id}/${id}`, {
						newPosition: task.position,
						newColumn: task.column,
					});
					return task;
				} else {
					return task;
				}
			}
		});
		console.log(modifiedArray);
		setTasks(modifiedArray);
	};

	const handleCreateModal = () => {
		setCreateModal((prev) => !prev);
	};

	return (
		<Grid container>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h3'>Board</Typography>
				</Grid>
				<Grid item>
					<Button
						variant='contained'
						color='primary'
						onClick={handleCreateModal}>
						New task
					</Button>
				</Grid>
			</Grid>
			{/* Dialog for adding a new task */}
			<Dialog onClose={handleCreateModal} open={createModal} fullWidth>
				<DialogTitle>Add a new task</DialogTitle>
				<Grid container>
					<Grid item xs={12} my={2} mx={2}>
						<TextField
							name='taskTitle'
							label='Task title'
							variant='outlined'
							fullWidth
							value={formik.values.taskTitle}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid item xs={12} mx={2}>
						<FormControl fullWidth>
							<InputLabel id='id1'>Task Type</InputLabel>
							<Select
								name='taskType'
								variant='outlined'
								labelId='id1'
								label='Task type'
								onChange={formik.handleChange}
								value={formik.values.taskType}>
								<MenuItem value='task'>Task</MenuItem>
								<MenuItem value='bug'>Bug</MenuItem>
								<MenuItem value='issue'>Issue</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} my={2} mx={2}>
						<TextField
							name='taskBody'
							value={formik.values.taskBody}
							onChange={formik.handleChange}
							variant='outlined'
							fullWidth
							label='Description'
						/>
					</Grid>
					<Grid item xs={12} my={2} mx={2}>
						<FormControl fullWidth>
							<InputLabel id='id2'>Task priority</InputLabel>
							<Select
								fullWidth
								labelId='id2'
								label='Priority'
								name='priority'
								onChange={formik.handleChange}
								value={formik.values.priority}>
								<MenuItem value='1'>Low priority</MenuItem>
								<MenuItem value='2'>Medium priority</MenuItem>
								<MenuItem value='3'>High priority</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} my={2} mx={2}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								label='Deadline (optional)'
								inputFormat='MM/dd/yyyy'
								disablePast
								name='deadline'
								onChange={(val) => formik.setFieldValue("deadline", val)}
								value={formik.values.deadline}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12}>
						<Button
							color='secondary'
							variant='contained'
							fullWidth
							onClick={formik.handleSubmit}>
							Add task
						</Button>
					</Grid>
				</Grid>
			</Dialog>
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
														if (item.column !== column.colName) return;
														return (
															<Draggable
																key={item._id}
																draggableId={item._id}
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
																						{item.taskBody}
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
			<Modal
				open={modalOpen}
				onClose={handleModal}
				sx={{
					overflow: "scroll",
					height: "100%",
					position: "absolute",
					display: "block",
					top: "10%",
				}}>
				<Grid
					style={detailModalStyle}
					container
					width={1000}
					height='auto'
					justifyContent='center'
					alignItems='center'>
					{selectedTask && selectedTask.taskBody && (
						<>
							<Grid item xs={12} md={8}>
								<Grid container>
									<Grid item xs={12}>
										<Typography variant='h3'>Task details</Typography>
									</Grid>
									<Grid item xs={12}>
										{/* TODO: ADD TITLE INSTEAD OF TEXT */}
										<Typography variant='h6'>
											TITLE: {selectedTask.taskTitle}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										{isModalEditMode ? (
											<Button
												startIcon={<EditIcon />}
												variant='outlined'
												color='secondary'
												sx={{ marginRight: "1rem" }}
												onClick={(e) => toggleEdit(true)}>
												Publish changes
											</Button>
										) : (
											<Button
												startIcon={<EditIcon />}
												variant='outlined'
												color='info'
												sx={{ marginRight: "1rem" }}
												onClick={(e) => toggleEdit(false)}>
												Edit
											</Button>
										)}
										{isModalEditMode ? null : (
											<>
												<Button
													startIcon={<AddCommentIcon />}
													variant='outlined'
													color='info'
													sx={{ marginRight: "1rem" }}
													onClick={(e) => setWorkLogOpen((prev) => !prev)}>
													{workLogOpen
														? "Close work logs"
														: "Add a new work log"}
												</Button>
												{selectedTask.asignee &&
												selectedTask.asignee._id === user._id ? (
													<Button
														variant='outlined'
														color='info'
														sx={{ marginRight: "1rem" }}
														onClick={assignSelf}>
														Unassign self
													</Button>
												) : (
													<Button
														variant='outlined'
														color='info'
														sx={{ marginRight: "1rem" }}
														onClick={assignSelf}>
														Assign self
													</Button>
												)}
											</>
										)}
									</Grid>
									<Grid item xs={6} mt={3}>
										{isModalEditMode ? (
											editableType && (
												<FormControl>
													<InputLabel id='id1'>Task type</InputLabel>
													<Select
														labelId='id1'
														sx={{ width: 200 }}
														onChange={(e) => setEditableType(e.target.value)}
														value={editableType}>
														<MenuItem value='task'>Task</MenuItem>
														<MenuItem value='bug'>Bug</MenuItem>
														<MenuItem value='issue'>Issue</MenuItem>
													</Select>
												</FormControl>
											)
										) : (
											<Typography variant='h6'>Type: Task</Typography>
										)}
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
										{isModalEditMode ? (
											editableTitle && (
												<TextField
													sx={{ width: 200 }}
													onChange={(e) => setEditableTitle(e.target.value)}
													value={editableTitle}
												/>
											)
										) : (
											<Typography variant='h6'>
												Title: {selectedTask.taskBody}
											</Typography>
										)}
									</Grid>
									<Grid item xs={12}>
										{isModalEditMode ? (
											editableDesc && (
												<TextField
													sx={{ width: 200 }}
													onChange={(e) => setEditableDesc(e.target.value)}
													value={editableDesc}
												/>
											)
										) : (
											<Typography variant='h6'>
												Description: {selectedTask.taskBody}
											</Typography>
										)}
									</Grid>
									<Grid item xs={2}>
										<Typography variant='h6'>
											Votes: {selectedTask.votes.length || 0}{" "}
										</Typography>
									</Grid>
									<Grid item xs={6} display='flex' alignItems='center'>
										{selectedTask.votes.includes(user._id) ? (
											<IconButton color='primary' onClick={toggleVote}>
												<ThumbUpAltIcon />
											</IconButton>
										) : (
											<IconButton color='primary' onClick={toggleVote}>
												<ThumbUpOffAltIcon />
											</IconButton>
										)}
									</Grid>
									<Grid item xs={12} mt={3} mb={3}>
										<hr></hr>
									</Grid>

									<Grid item xs={12}>
										<Typography variant='body1'>
											<strong>Activity</strong>
										</Typography>
									</Grid>
									{workLogOpen && (
										<>
											<Grid item xs={12} my={2}>
												<TextField
													variant='outlined'
													fullWidth
													label='Title'
													value={logTitle}
													onChange={(e) => setLogTitle(e.target.value)}
												/>
											</Grid>
											<Grid item xs={12} my={2}>
												<TextField
													multiline
													minRows={3}
													variant='outlined'
													fullWidth
													label='Description'
													value={logBody}
													onChange={(e) => setLogBody(e.target.value)}
												/>
											</Grid>
											<Grid item xs={12} my={2}>
												<TextField
													variant='outlined'
													fullWidth
													label='Link'
													value={logLink}
													onChange={(e) => setLogLink(e.target.value)}
												/>
											</Grid>
											<Button
												variant='contained'
												sx={{ mx: "auto" }}
												onClick={submitLog}>
												Add a work log
											</Button>
										</>
									)}

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
									{selectedTask.workLogs.map((log) => (
										<Grid key={log._id} item xs={12}>
											<hr></hr>
											<Grid container>
												<Grid item xs={3}>
													<Typography variant='body1'>
														{moment(log.date).format("DD/MM/YYYY h:mm:ss")}
													</Typography>
												</Grid>
												<Grid item xs={3}>
													<Typography variant='body1'>{log.title}</Typography>
												</Grid>
												<Grid item xs={3}>
													{log.link ? (
														<Link
															target='_blank'
															href={`${log.link}`}
															variant='body1'>
															COMMIT URL
														</Link>
													) : (
														<strong>-</strong>
													)}
												</Grid>
												<Grid item xs={3} sx={{ wordBreak: "break-word" }}>
													<Typography variant='body1'>
														{log.description}
													</Typography>
												</Grid>
											</Grid>
										</Grid>
									))}
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
										{selectedTask.asignee ? (
											<>
												<Typography variant='h6'>
													Alen Valek ( System Admin )
												</Typography>
												<Avatar sx={{ bgcolor: "orange" }}>AV</Avatar>
											</>
										) : (
											<Typography variant='h6'>No one asigned</Typography>
										)}
									</Grid>
									<Grid item xs={12}>
										<Typography variant='h6' ml={2}>
											Votes: {selectedTask.votes.length || 0}
										</Typography>
									</Grid>

									<Grid item xs={9}>
										<Typography variant='h6' ml={2}>
											Created:{" "}
											{moment(selectedTask.createdAt).format("DD/MM/YYYY")}
										</Typography>
									</Grid>
								</Grid>
								<Grid item xs={12} mx={2} display='flex' alignItems='center'>
									<Avatar sx={{ bgcolor: "orange", marginRight: 2 }}>
										{selectedTask.reportedBy.firstName[0]}
										{selectedTask.reportedBy.lastName[0]}
									</Avatar>
									<Typography variant='h6'>
										Reported by: {selectedTask.reportedBy.firstName}{" "}
										{selectedTask.reportedBy.lastName}
									</Typography>
								</Grid>
								{selectedTask.deadline && (
									<Grid item xs={12} mx={2} display='flex' alignItems='center'>
										<Typography variant='h6'>
											Due date: {moment(selectedTask.deadline).fromNow()}
										</Typography>
									</Grid>
								)}
							</Grid>
						</>
					)}
				</Grid>
			</Modal>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { setProject })(Project);
