import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Grid, Link, Paper, Typography, useTheme } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { InputText } from "../../components/Form/InputText";

type FormInput = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const defaultValues = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const config: AxiosRequestConfig = {
	headers: { "Content-Type": "application/json" },
};

const Register = () => {
	const history = useHistory();
	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Username is required").min(6, "Username must be at least 6 characters").max(20, "Username must not exceed 20 characters"),
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(40, "Password must not exceed 40 characters"),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
	});
	const { handleSubmit, control } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onSubmit = async (formData: FormInput) => {
		try {
			const { data } = await axios.post("/api/auth/register", formData, config);
			// localStorage.setItem("authToken", data.token);
			history.push("/");
		} catch (error) {}
	};
	const theme = useTheme();

	return (
		<Container
			maxWidth={"xs"}
			sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<Paper>
				<Box px={3} py={2}>
					<Typography variant="h1" align="center" my={2}>
						Register
					</Typography>

					<Grid container spacing={2} direction="column">
						<Grid item xs={12} sm={6}>
							<InputText name="username" control={control} label="Username" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name="email" control={control} label="Email" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name="password" control={control} label="Password" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name="confirmPassword" control={control} label="Confirm Password" />
						</Grid>
					</Grid>

					<Box mt={3}>
						<Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
							Register
						</Button>
					</Box>
					<Box mt={1} textAlign="left">
						<Link href="/login" underline="hover" color="primary">
							Already have an account? Login
						</Link>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Register;
