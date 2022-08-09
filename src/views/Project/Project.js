import { Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setProject } from "../../store/actions/project";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { range, orderBy } from "lodash";
import ReorderIcon from "@mui/icons-material/Reorder";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Project = ({ setProject }) => {
	useEffect(() => {
		setProject({ id: 1 });
	}, []);

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

	const [tasks, setTasks] = useState(_tasks);

	const [columns, setColumns] = useState({
		TODO: { id: "1", title: "TO DO" },
		IN_PROGRESS: { id: "2", title: "In progress" },
		IN_REVIEW: { id: "3", title: "In review" },
		DONE: { id: "4", title: "Done" },
	});

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
					console.log("dest: ", destination.index);
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
		console.log(tasks);
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
																					<IconButton>
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
		</Grid>
	);
};

export default connect(null, { setProject })(Project);
