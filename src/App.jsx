import { useState } from "react";
import { nanoid } from "nanoid";
import ContainerHalloContent from "./components/ContainerHalloContent.jsx";
import FilterButton from "./components/FilterButton.jsx";
import Form from "./components/Form.jsx";
import Todo from "./components/Todo.jsx";


// Erstellen eines Objektes mit den möglichen (bzw. gewüschten) Filter-Optionen für die To-Do-Liste. Jeder Key ist
// der Name eines Filters, jede Eigenschaft ist eine Funktion, die das mit dem Namen verbundene Verhalten steuert.
// Die Funktionen dienen dann als Callback-Funktionen für die Filterung des tasks-Array.
const FILTER_MAP = {
	alle: () => true,
	offen: (task) => !task.completed,
	erledigt: (task) => task.completed,
};

// Alle Keys (Namen) aus dem FILTER_MAP-Objekt in ein Array speichern
const FILTER_NAMES = Object.keys(FILTER_MAP);


// Hauptfunktion der App-Komponente.
// Übergabe der "tasks"-Property via "props" aus der main.jsx
function App(props) {

	// State-Variablen "tasks" und "filter" mit initialen Werten erstellen
	const [tasks, setTasks] = useState(props.tasks);
	const [filter, setFilter] = useState("alle");

	// Funktion: "Aufgabe hinzufügen"
	// "name" ist der Taskname, der durch das Input-Formular übergeben wird
	function addTask(name) {

		// Wenn nur Leerzeichen eingegeben werden, mache nichts
		/*
		* Die Verwendung von trim() für eine Zeichenfolge aus reinen Leerzeichen, führt zu einer
		* Zeichenlänge von 0. Mit der Eigenschaft „length“ gekoppelt, kann man sehr einfach Zeichenfolgen
		* erkennen, die nur aus Leerzeichen bestehen.
		*/
		if (name.trim().length === 0) {
			return;
		}

		// Ein neuen Task nur hinzufügen, wenn das Input-Feld nicht leer ist ...
		if (name !== "") {

			// ein neues Daten-Set für den Task erstellen
			const newTask = {
				id: `todo-${nanoid()}`, // -> hiermit wird eine zufällige und eindeutige ID erzeugt
				name: name,
				completed: false
			};

			// den neuen Task am Angang des tasks-Array einfügen und in der Variable 'updatedTasks' speichern
			let updatedTasks = [newTask, ...tasks];

			// den tasks-State mit updatedTasks aktualisieren
			setTasks(updatedTasks);

			// updatedTasks in ein JSON-Format (string) konvertieren und im key "mylist" in die localstorage speichern
			localStorage.setItem("list", JSON.stringify(updatedTasks));

			// Falls der Filter auf "erledigt" gesetzt ist, setze bei einem neuen Eintrag den Filter auf "alle",
			// damit man sieht, dass ein neuer Eintrag hinzugefügt wurde,
			setFilter("alle");

		}

		// ... andernfalls gib diese Alert-Meldung aus.
		else {
			alert('Hey sailor, type a task!');
		}
	}

	// Funktion: "Aufgabe entfernen"
	function deleteTask(id) {
		// Den Task mit der "id" aus der Taskliste herausfiltern und die übrig gebliebenen Tasks
		// in der Variable "remainingTasks" speichern.
		const remainingTasks = tasks.filter((task) => id !== task.id);

		// den tasks-State mit "remainingTasks" aktualisieren
		setTasks(remainingTasks);

		// "remainingTasks" in JSON konvertieren und localstorage damit aktualisieren
		localStorage.setItem("list", JSON.stringify(remainingTasks));
	}

	// Funktion: "Aufgabe bearbeiten"
	function editTask(id, newName) {

		// Erstelle ein neues Array "editedTaskList" mit allen Tasks, die bearbeitet werden.
		const editedTaskList = tasks.map((task) => {

			// Wenn die übergebene Task-Id (id) gleich der Task-Id der Taskliste (task.id) ist...
			if (id === task.id) {

				// ... dann führe diesen Code aus:
				// wenn "newName" nicht leer ist, dann gebe ein aktualisiertes Daten-Set des Tasks zurück,
				// andernfalls gebe das ursprüngliche Daten-Set zurück
				return (newName !== "") ? { ...task, name: newName, completed: false } : task;
			}

			// Gebe das ursprüngliche Daten-Set des Tasks zurück, wenn dieser nicht bearbeitet wurde.
			return task;
		});

		// den tasks-State mit "editedTaskList" aktualisieren
		setTasks(editedTaskList);

		// "editedTaskList" in JSON konvertieren und localstorage damit aktualisieren
		localStorage.setItem("list", JSON.stringify(editedTaskList));
	}

	// Funktion: "Umschalten zwischen "erledigt" und "offen"
	// Wird ausgeführt bei beim Klick auf die jeweilige Checkbox
	function toggleTaskCompleted(id) {

		// Erstelle ein neues Array "updatedTasks" mit allen Tasks, deren Statuszustände aktualisiert werden.
		const updatedTasks = tasks.map((task) => {

			// Wenn die übergebene Task-Id (id) gleich der Task-Id der Taskliste (task.id) ist...
			if (id === task.id) {

				// ... dann aktualisiere das entsprechende Daten-Set des Tasks, indem der Wert der "completed"-Eigenschaft
				// invertiert wird. Um ein verändertes Daten-Set zurückzugeben, wird hier wird ein Spread-Operator (...) verwendet.
				return { ...task, completed: !task.completed };
			}

			// Gebe das ursprüngliche Daten-Set zurück, falls die Checkbox nicht geklickt wurde.
			return task;
		});

		// den tasks-State mit "updatedTasks" aktualisieren
		setTasks(updatedTasks);

		// "updatedTasks" in JSON konvertieren und localstorage damit aktualisieren
		localStorage.setItem("list", JSON.stringify(updatedTasks));
	}


/*
* Hier wird abhänging vom Filter-Status die eigentliche Taskliste erzeugt und in der Variable "taskList" gespeichert.
* Die filter-Methode filtert das tasks-Array über eine Callback-Funktion. FILTER_MAP[filter] repräsentiert hierbei
* die Callback-Funktion der gewählten Filter-Option (Siehe FILTER_MAP Deklaration an Anfang des Scriptes).
*
* Über die map-Methode wird dann die Todo-Komponente so oft erstellt wie Elemente in der Task-Liste vorhanden sind.
* Die Properties "deleteTask", "toggleTaskCompleted", "editTask" übergeben jeweils die oben deklarierten
* Funktionen an die Todo-Komponente (Setter). Diese Funktionen können dann in der Todo-Komponente als
* Callback-Funktionen über das Klick-Event ausgeführt werden.
*/
	const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
			deleteTask={deleteTask}
			toggleTaskCompleted={toggleTaskCompleted}
			editTask={editTask}
		/>
	));


	/*
	* Auf die gleiche Weise werden die Filter-Buttons erzeugt und in der Variable "filterList" gespeichert. Über die
	* map-Methode des FILTER_NAMES-Array wird die FilterButton-Komponente so oft erstellt wie Elemente im FILTER_NAMES-Array
	* vorhanden sind.
	* Die Property "isPressed" übergibt den Namen des Filters abhängig vom filter-State. Die "setFilter"-Property übergibt
	* die setState-Funktion als Setter-Funktion an die FilterButton-Komponente. Diese kann dort dann als
	* Callback-Funktion über das Klick-Event ausgeführt werden.
	*/
	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

  return (
		<div className="page-wrap">
			<header>
				<h1>Do It Now Or Never</h1>
			</header>
			<main>

				<div className="container-hallo">
					<ContainerHalloContent />
					{/* Add-Task-Form rendern */}
					<Form addTask={addTask} />
					<div className="filter-buttons">
						{/* Filter-Buttons rendern */}
						{filterList}
					</div>
				</div>

				<ul
					role="list"
					className="task-list"
					aria-labelledby="list-heading">
					{/* Taskliste rendern */}
					{taskList}
				</ul>

			</main>
		</div>
  );
}

export default App;
