import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setProject } from "../../store/actions/project";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const Project = ({ setProject }) => {
	useEffect(() => {
		setProject({ id: 1 });
	}, []);

	const [tasks, setTasks] = useState([
		{ id: "1", text: "Fix the bug on the navbar" },
		{ id: "2", text: "Change layout of cards @Home" },
		{ id: "3", text: "Make pricing cheaper" },
		{ id: "4", text: "Do magic with css" },
	]);

	const [columns, setColumns] = useState({
		[uuid()]: { id: "1", title: "TO DO", tasks: tasks },
		[uuid()]: { id: "2", title: "In progress", tasks: [] },
		[uuid()]: { id: "3", title: "In review", tasks: [] },
		[uuid()]: { id: "4", title: "Done", tasks: [] },
	});

	const handleDrag = (res) => {
		if (!res.destination) return;

		const { source, destination } = res;

		if (source.droppableId !== destination.droppableId) {
			const col = columns[source.droppableId];
			const destCol = columns[destination.droppableId];
			const sourceTasks = [...col.tasks];
			const destTasks = [...destCol.tasks];
			const [removed] = sourceTasks.splice(source.index, 1);
			destTasks.splice(destination.index, 0, removed);

			setColumns({
				...columns,
				[source.droppableId]: {
					...col,
					tasks: sourceTasks,
				},
				[destination.droppableId]: {
					...destCol,
					tasks: destTasks,
				},
			});
		} else {
			const col = columns[source.droppableId];
			const colTasksCopy = [...col.tasks];
			const [removed] = colTasksCopy.splice(source.index, 1);
			colTasksCopy.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...col,
					tasks: colTasksCopy,
				},
			});
		}
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
														width: 250,
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
													{column.tasks.map((item, index) => {
														return (
															<Draggable
																key={item.id}
																draggableId={item.id}
																index={index}>
																{(provided, snapshot) => {
																	return (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
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
																			{item.text}
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
