import { ThemeProvider } from "@mui/material/styles";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { customTheme } from "./config/MuiTheme/theme";
import Details from "./pages/Details/Details";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Private from "./pages/Private/Private";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Results from "./pages/Results/Results";

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<CookiesProvider>
				<Router>
					<div className="App">
						<Switch>
							<Route exact path="/login" component={Login} />
							<>
								<NavBar />
								<Route exact path="/" component={Home} />
								<Route exact path="/private" component={Private} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/forgotpassword" component={ForgotPassword} />
								<Route exact path="/resetPassword/:resetToken" component={ResetPassword} />
								<Route exact path="/results/:category" component={Results} />
								<Route path="/results/:category/:id" component={Details} />
							</>
						</Switch>
					</div>
				</Router>
			</CookiesProvider>
		</ThemeProvider>
	);
}

export default App;
