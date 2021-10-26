import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Container, Grid, Paper, Typography, useTheme } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import * as Yup from "yup";
import { InputText } from "../../components/Form/InputText";

type Params = {
	resetToken: string;
};
type FormInput = {
	password: string;
	confirmPassword: string;
};

const defaultValues = {
	password: "",
	confirmPassword: "",
};

const config: AxiosRequestConfig = {
	headers: { "Content-Type": "application/json" },
};

const ResetPassword = () => {
	const [error, setError] = useState<string>();
	const param = useParams<Params>();
	const theme = useTheme();
	const history = useHistory();
	const validationSchema = Yup.object().shape({
		password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters").max(40, "Password must not exceed 40 characters"),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
	});
	const { handleSubmit, control } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onSubmit = async (formData: FormInput) => {
		try {
			const { data } = await axios.put(`/api/auth/resetPassword/${param.resetToken}`, formData, config);
		} catch (error) {
			setError("Unable to reset password");
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	};

	return (
		<Container
			maxWidth={"xs"}
			sx={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<Paper>
				<Box px={3} py={2}>
					<Typography variant="h1" align="center" my={2}>
						Reset Password
					</Typography>
					{error && (
						<Alert severity="error" sx={{ my: 2 }}>
							{error}
						</Alert>
					)}
					<Grid container spacing={2} direction="column">
						<Grid item xs={12} sm={6}>
							<InputText name="password" control={control} label="Password" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name="confirmPassword" control={control} label="Confirm Password" />
						</Grid>
					</Grid>

					<Box mt={2}>
						<Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
							Reset Password
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default ResetPassword;
