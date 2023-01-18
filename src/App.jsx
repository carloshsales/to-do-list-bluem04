import { Container, Input, Button, Flex, Item } from "./styles/global.js";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { todoService } from "./helpers/Api";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export function App() {
	const [task, setTask] = useState("");
	const [listTasks, setListTasks] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [taskEdit, setTaskEdit] = useState({});
	const [update, setUpdate] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const addTask = async () => {
		if (!task) return alert("Preencha com uma tarefa!");
		const newTask = {
			id: uuidv4(),
			task: task,
			checked: false,
		};

		const data = await todoService.createTodo(newTask);

		setListTasks([...listTasks, data.data]);
		setTask("");
	};

	const loadTasks = async () => {
		const resp = await todoService.getTodoList();
		setListTasks(resp);
	};

	useEffect(() => {
		loadTasks();
	}, [update]);

	const editTask = async (e) => {
		e.preventDefault();
		const task = taskEdit;
		const data = e.target.edit.value;

		await todoService.updateTodo(task, data);

		setUpdate(!update);
		closeModal();
	};

	const removeTask = async (id) => {
		const deletedTask = await todoService.deleteTodo(id);
		setUpdate(!update);
	};

	const toggleTask = (id, checked) => {
		const index = listTasks.findIndex((task) => task.id === id);
		const newList = listTasks;
		newList[index].checked = !checked;
		setListTasks([...newList]);
	};

	return (
		<>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={{
					content: {
						backgroundColor: "#2d2d2d",
						borderRadius: "16px",
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
					},
				}}
				contentLabel="Example Modal"
			>
				<form onSubmit={editTask}>
					<Input
						name="edit"
						type="text"
						id="edit"
						placeholder="Digite a nova task"
					/>
					<Button type="submit">Editar</Button>
				</form>
			</ReactModal>

			<Container>
				<h1 className="title">TO-DO LIST</h1>
				<Flex direction="row">
					<Input
						value={task}
						placeholder="Digite sua tarefa:"
						onChange={(e) => setTask(e.target.value)}
					/>
					<Button onClick={addTask}>Adicionar</Button>
				</Flex>

				<ul>
					{listTasks.map((task) => (
						<Item checked={task.checked} key={task.id}>
							<p>{task.task}</p>
							<Flex direction="row">
								<button
									onClick={() =>
										toggleTask(task.id, task.checked)
									}
								>
									<i className="bx bx-check"></i>
								</button>
								<button
									onClick={() => {
										openModal();
										setTaskEdit(task.id);
									}}
								>
									<i className="bx bx-edit"></i>
								</button>
								<button onClick={() => removeTask(task.id)}>
									<i className="bx bx-trash"></i>
								</button>
							</Flex>
						</Item>
					))}
				</ul>
			</Container>
		</>
	);
}
