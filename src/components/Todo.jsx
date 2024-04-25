import { useState } from "react";

// Hauptfunktion der FilterButton-Komponente
// Übergabe der Properties via "props" aus der App.jsx
function Todo(props) {

	// State-Variablen "isEditing" und "newName" erstellen
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState(props.name); // alter Taskname ist initial


	// Funktion um das Absenden des Forms zu managen
	function handleSubmit(event) {
		// Das Standardverhalten des Forms beim Absenden unterbinden (Die Webseite wird dadurch nicht neu geladen)
		event.preventDefault();

		// Ausführen der editTask-Funktion aus der App-Komponente. Damit wird der Taskname aktualisiert.
		props.editTask(props.id, newName);

		// Nach dem Hinzufügen des Tasks den State von "newName" zurücksetzen.
		// setNewName("");

		// Den State von "isEditing" auf false setzen
		setEditing(false);
	}

	// Funktion um die Eingabe in das Input-Feld im Editing-Template zu managen.
	// Der State des Tasknamens wird bei jeder Eingabe aktualisiert.
	function handleChange(e) {
		setNewName(e.target.value);
	}



	// Erstellen des View-Templates. Dieses Markup soll angezeigt werden, wenn der State von "isEditing" false ist.
	const viewTemplate = (
		<>
			<div className="chkbox-wrap">
				<input
					type="checkbox"
					className="checkbox"
					id={props.id}

					/* Das Checkbox-Häkchen anzeigen oder nicht,
					abhängig ob props.completed "true" oder "false" ist */
					defaultChecked={props.completed}

					/* toggleTaskCompleted-Funktion aus der App.jsx ausführen.
					Die id des jeweiligen tasks wird hier mit übergeben. */
					onChange={() => props.toggleTaskCompleted(props.id)} /**/
				/>
			</div>

			<div className="task-item-text">
				{props.name}
			</div>

			<button
				className="edit-btn"
				/* Bei Klick auf den Edit-Button den "isEditing"-State auf true setzen */
				onClick={() => setEditing(true)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
				<path fill="currentColor" d="M5.38 6.808H18.6l-1.33-1.596q-.097-.097-.222-.154Q16.923 5 16.788 5H7.192q-.134 0-.26.058t-.22.154zM10 12.962l2-1l2 1V7.808h-4zM5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V7.487q0-.293.093-.55t.28-.475L5.931 4.59q.217-.292.543-.441t.7-.149h9.614q.374 0 .71.149t.552.441l1.577 1.91q.186.217.28.485t.093.56v2.32q-.275.02-.518.066q-.244.046-.482.136v-2.26h-4v5.856l-.617.618L12 13.096l-3 1.5V7.808H5v10.577q0 .269.173.442t.442.173h6.231v1zM15 7.808h4zm-10 0h9.383zM14.23 20v-2.21l5.333-5.307q.149-.148.308-.2q.16-.052.32-.052q.165 0 .334.064t.298.193l.925.945q.123.148.188.307t.064.32t-.062.322t-.19.31L16.44 20zm6.885-5.94l-.925-.945zm-6 5.055h.95l3.468-3.473l-.47-.475l-.455-.488l-3.493 3.486zm3.948-3.948l-.455-.488l.925.963z"/>
				</svg>
			</button>

			<button
				className="remove-btn"
				/* Ausführen der deleteTask-Funktion aus der App-Komponente bei Klick auf den Delete-Button. Die Task-Id wird hier übergeben. */
				onClick={() => props.deleteTask(props.id)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
				<path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
				</svg>
			</button>
		</>
	);


  // Erstellen des Editing-Templates. Dieses Markup soll angezeigt werden, wenn der State von "isEditing" true ist.
	const editingTemplate = (
		<>
			{/* handeSubmit-Funktion beim Ansenden des Forms ausführen - bei Enter oder Save-Button */}
			<form onSubmit={handleSubmit}>


					<input
						id={props.id}
						className="input-task"
						type="text"
						value={newName} // geänderten Taskname als value des Input-Feldes abbilden
						onChange={handleChange}  // handleChange(event) ausführen bei Change-Event
					/>


				<button className="save-btn" type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
						<path fill="currentColor" d="m10.925 13.8l4.963-4.938l-.713-.714l-4.25 4.25L8.8 10.273l-.708.708zm-9.156 5.662v-1h20.462v1zm1.231-2v-13h18v13zm1-1h16v-11H4zm0 0v-11z"/>
					</svg>
				</button>

				<button
					className="cancel-btn"
					/* Bei Klick auf den Cancel-Button den "isEditing"-State auf false setzen */
					onClick={() => setEditing(false)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
						<path fill="currentColor" d="M17.414 16L26 7.414L24.586 6L16 14.586L7.414 6L6 7.414L14.586 16L6 24.586L7.414 26L16 17.414L24.586 26L26 24.586z"/>
					</svg>
				</button>

			</form>
		</>
	);

	return (
		<li className={props.completed ? "task-item done" : "task-item"}>
			{/* Conditional Rendering der zwei verschiedenen Templates */}
			{isEditing ? editingTemplate : viewTemplate}
		</li>
	);
}

export default Todo;



