// Hauptfunktion der FilterButton-Komponente
// Übergabe der Properties via "props" aus der App.jsx
function FilterButton(props) {
	return (
		<button
			type="button"
			aria-pressed={props.isPressed}

			/* Wenn (props.isPressed === true) dann className 'active' für den jeweils aktiven Filter-Button setzen. */
			className={props.isPressed ? 'filter-btn active' : 'filter-btn'}

			/* setFilter-Funktion (filter-State) aus der App.jsx ausführen */
			onClick={() => props.setFilter(props.name)}>

			{props.name}
		</button>
	);
}

export default FilterButton;
