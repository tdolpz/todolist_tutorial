import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
const data = [
	{ id: "todo-0", name: "Eat", completed: true },
	{ id: "todo-1", name: "Sleep", completed: false },
	{ id: "todo-2", name: "Repeat", completed: false },
]
*/

// Variable "data" initialisieren
let data;

// Wenn noch kein localStorage-Eintrag vorhanden ist, deklariere "data" als leeres Array...
if (localStorage.getItem("list") === null) {
	data = [];
}
// .. andernfalls erstelle aus dem JSON-String des localstorage-Eintrages ein Array und
// weise dieses der Variable "data" zu.
else {
	data = JSON.parse(localStorage.getItem("list"));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		{/* Hier wird das data-Array über die Property "tasks" an die App-Komponente übergeben */}
    <App tasks={data} />
  </React.StrictMode>,
)

