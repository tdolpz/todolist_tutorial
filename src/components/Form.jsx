import { useState } from "react";

// Hauptfunktion der Form-Komponente
function Form(props) {

	// State-Variable für den Taskname erstellen
	const [name, setName] = useState("");

	// Funktion um das Absenden des Forms zu managen
	function handleSubmit(event) {
		// Das Standardverhalten des Forms beim Absenden unterbinden (Die Webseite wird dadurch nicht neu geladen)
		event.preventDefault();

		// Ausführen der addTask-Funktion aus der App-Komponente. Damit wird ein neuer Task hinzugefügt.
		props.addTask(name);

		// Nach dem Hinzufügen des Tasks den State des Tasknamens zurücksetzen und damit das Input-Feld wieder leeren.
		setName("");
	}

	// Funktion um die Eingabe in das Input-Feld zu managen. Der State des Tasknamens wird bei jeder Eingabe aktualisiert.
	function handleChange(event) {
		setName(event.target.value);
	}

	return (
		<div className="container-new-todo">
			{/* handeSubmit-Funktion beim Ansenden des Forms ausführen - bei Enter oder Add-Button */}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="input-task"
					id="newTaskInput"
					placeholder="Was ist noch zu tun?"
					autoComplete="off"
					value={name} // Taskname als value des Input-Feldes abbilden
					onChange={handleChange} // handleChange(event) ausführen bei Change-Event
				/>
				<button type="submit" className="add-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V5.615q0-.67.472-1.143Q4.944 4 5.615 4h12.77q.67 0 1.143.472q.472.472.472 1.143v5.95q-.263-.09-.504-.147T19 11.306v-5.69q0-.231-.192-.424T18.385 5H5.615q-.23 0-.423.192T5 5.615v12.77q0 .23.192.423t.423.192h5.666q.036.28.093.521t.147.479zM5 18v1V5v6.306v-.075zm2.5-1.73h3.96q.055-.257.15-.497t.2-.504H7.5zm0-3.77h6.58q.493-.346.97-.587t1.027-.376V11.5H7.5zm0-3.77h9v-1h-9zM18 22.116q-1.671 0-2.836-1.164T14 18.115t1.164-2.835T18 14.115t2.836 1.165T22 18.115t-1.164 2.836T18 22.115M17.615 21h.77v-2.5h2.5v-.77h-2.5v-2.5h-.77v2.5h-2.5v.77h2.5z"
						/>
					</svg>
				</button>
			</form>
		</div>
	);
}

export default Form;
