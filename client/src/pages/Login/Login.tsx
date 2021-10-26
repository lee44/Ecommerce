import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Container, Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { InputText } from "../../components/Form/InputText";

type FormInput = {
	email: string;
	password: string;
};

const defaultValues = {
	email: "",
	password: "",
};

const config: AxiosRequestConfig = {
	headers: { "Content-Type": "application/json" },
};

const Login = () => {
	const [error, setError] = useState<string>();
	const theme = useTheme();
	const history = useHistory();
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(40, "Password must not exceed 40 characters"),
	});
	const { handleSubmit, control } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onSubmit = async (formData: FormInput) => {
		try {
			const { data } = await axios.post("/api/auth/login", formData, config);
			localStorage.setItem("authToken", data.token);
			history.push("/");
		} catch (error) {
			setError("Invalid email and password");
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/");
		}
	}, [history]);

	return (
		<Container
			maxWidth={"xs"}
			sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<Paper>
				<Box px={3} py={2}>
					<Typography variant="h1" align="center" my={2}>
						Login
					</Typography>
					{error && (
						<Alert severity="error" sx={{ my: 2 }}>
							{error}
						</Alert>
					)}
					<Grid container spacing={2} direction="column">
						<Grid item xs={12} sm={6}>
							<InputText name="email" control={control} label="Email" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name="password" control={control} label="Password" />
						</Grid>
					</Grid>
					<Box mt={1}>
						<Link href="/forgotpassword" underline="hover" color="primary" textAlign="start">
							Forgot Password?
						</Link>
					</Box>
					<Box mt={2}>
						<Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
							Login
						</Button>
					</Box>
					<Box mt={1} textAlign="left">
						<Link href="/register" underline="hover" color="primary">
							Don't have an account? Register
						</Link>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;
