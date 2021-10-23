import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { customTheme } from "./config/theme";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Results from "./pages/Results/Results";

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
						<Route exact path="/login">
							<Login />
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
