import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.patch["Content-Type"] = "application/json";

export const todoService = {
	getTodoList: async () => {
		return await axios
			.get("/tasks")
			.then((response) => response.data)
			.catch((e) => console.log(e));
	},

	createTodo: async (todo) =>
		await axios.post("/tasks", todo).then((response) => response),

	getById: async (id) => {
		const data = await todoService.getTodoList();
		return data.find((item) => {
			if (item.id == id) {
				return item;
			}
		});
	},

	updateTodo: async (id, todo) => {
		const taskEdit = await todoService.getById(id);
		taskEdit.task = todo;
		// const taskCopy = Object.assign(taskEdit, todo);
		return axios.put("/tasks/" + id, taskEdit);
	},
	deleteTodo: async (id) => {
		await axios.delete("/tasks/" + id);
	},
};
