import React from "react";
import "./App.css";
import GridProducts from "./components/GridProducts/GridProducts";
import NavBar from "./components/NavBar/NavBar";

function App() {
	return (
		<div className="App">
			<NavBar />
			<GridProducts />
		</div>
	);
}

export default App;
