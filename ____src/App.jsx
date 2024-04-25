import { useState } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

	// tasks state
	const [tasks, setTasks] = useState(props.tasks);

	// filter state
	const [filter, setFilter] = useState("All");

	// toggle between "done" and "todo"

	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map((task) => {
			// if this task has the same ID as the edited task
			if (id === task.id) {
				// use object spread to make a new object
				// whose `completed` prop has been inverted
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
		localStorage.setItem("mylist", JSON.stringify(updatedTasks));
	}

	// remove task:
	// update task list with a new array of remaining tasks
	// update local storage with remaining tasks
	function deleteTask(id) {
		const remainingTasks = tasks.filter((task) => id !== task.id);
		setTasks(remainingTasks);
		localStorage.setItem("mylist", JSON.stringify(remainingTasks));
	}

	function editTask(id, newName) {
		const editedTaskList = tasks.map((task) => {
			// if this task has the same ID as the edited task
			if (id === task.id) {
				// if newName is not empty copy the task and update its name
				// else do nothing (return the original task)
				return (newName !== "") ? { ...task, name: newName, completed: false } : task;
			}
			// return the original task if it's not the edited task
			return task;
		});
		setTasks(editedTaskList);
		localStorage.setItem("mylist", JSON.stringify(editedTaskList));
	}

	function addTask(name) {
		if (name !== "") {
			const newTask = {
				id: `todo-${nanoid()}`,
				name: name,
				completed: false
			};
			setTasks([newTask, ...tasks]);
			localStorage.setItem("mylist", JSON.stringify([newTask, ...tasks]));
		}
		else {
			alert('Hey sailor, type a task!');
		}
	}


	// create (filtered) task list
	const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
		/>
	));

	// create filter buttons
	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
	const headingText = `${taskList.length} ${tasksNoun} remaining`;

	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				{filterList}
			</div>
			<h2 id="list-heading">{headingText}</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading">
				{taskList}
			</ul>
		</div>
	);
}

export default App;
