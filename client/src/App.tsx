import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { customTheme } from "./config/theme";
import Details from "./pages/Details/Details";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Results from "./pages/Results/Results";

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<Router>
				<div className="App">
					<NavBar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/forgotpassword" component={ForgotPassword} />
						<Route exact path="/resetPassword/:resetToken" component={ResetPassword} />
						<Route exact path="/results/:category" component={Results} />
						<Route path="/results/:category/:id" component={Details} />
					</Switch>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
