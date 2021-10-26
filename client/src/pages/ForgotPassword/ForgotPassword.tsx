import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, AlertTitle, Box, Button, Container, Grid, Paper, Typography, useTheme } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { InputText } from "../../components/Form/InputText";

type FormInput = {
	email: string;
};

const defaultValues = {
	email: "",
};

const config: AxiosRequestConfig = {
	headers: { "Content-Type": "application/json" },
};

const ForgotPassword = () => {
	const [email, setEmail] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Email is invalid"),
	});
	const { handleSubmit, control } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onSubmit = async (formData: FormInput) => {
		try {
			const response = await axios.post("/api/auth/forgotpassword", formData, config);
			setEmail(true);
		} catch (error) {
			setError(true);
		}
		setTimeout(() => {
			setEmail(false);
			setError(false);
		}, 5000);
	};
	const theme = useTheme();

	return (
		<Container
			maxWidth={"xs"}
			sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<Paper>
				<Box px={3} py={2}>
					{email && (
						<Alert severity="success">
							<AlertTitle sx={{ textAlign: "start" }}>Success</AlertTitle>
							Email has been sent
						</Alert>
					)}
					{error && (
						<Alert severity="error">
							<AlertTitle sx={{ textAlign: "start" }}>Failure</AlertTitle>
							Email does not exists
						</Alert>
					)}
					<Typography variant="h1" align="center" my={2}>
						Forgot Password
					</Typography>
					<Typography variant="body1" align="left" my={2}>
						Please enter the email address associated to your account so that we can send a reset password email.
					</Typography>

					<Grid container spacing={2} direction="column">
						<Grid item xs={12} sm={6}>
							<InputText name="email" control={control} label="Email" />
						</Grid>
					</Grid>

					<Box mt={3}>
						<Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
							Send Email
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default ForgotPassword;
