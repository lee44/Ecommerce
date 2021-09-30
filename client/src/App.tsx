import React from "react";
import "./App.css";
import { customTheme } from "./config/theme";
import { ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Results from "./pages/Result/Results";
import Details from "./pages/Details/Details";

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<Router>
				<div className="App">
					<NavBar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/results/:category">
							<Results />
						</Route>
						<Route path="/results/:category/:id">
							<Details />
						</Route>
					</Switch>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
