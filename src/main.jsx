import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let data;
if (localStorage.getItem("mylist") === null) {
	data = [];
}
else {
	data = JSON.parse(localStorage.getItem("mylist"));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={data}/>
  </React.StrictMode>,
)


//JSON.parse(localStorage.getItem("mylist"));
//localStorage.setItem("mylist", JSON.stringify(data));

/*
{ id: "todo-0", name: "Eat", completed: true },
{ id: "todo-1", name: "Sleep", completed: false },
{ id: "todo-2", name: "Repeat", completed: false },
*/
